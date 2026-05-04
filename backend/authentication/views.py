"""
Authentication and Profile Views
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .supabase_client import supabase
from .authentication import SupabaseJWTAuthentication
from .models import User, UserProfile
from .serializers import (
    UserSerializer,
    UpdateProfileSerializer,
    UpdatePreferencesSerializer,
    ChangePasswordSerializer,
)


@method_decorator(csrf_exempt, name="dispatch")
class RegisterUserView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")
        username = data.get("username")

        if not email or not password or not username:
            return Response(
                {"error": "Email, username, and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Register in Supabase Auth
        try:
            response = supabase.auth.sign_up({"email": email, "password": password})
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if response.user is None:
            return Response(
                {"error": "Supabase sign-up failed.", "detail": str(response)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mirror the user in your local Django DB
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "A user with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        User.objects.create(email=email, username=username)

        return Response(
            {"message": "User created successfully."}, status=status.HTTP_201_CREATED
        )


@method_decorator(csrf_exempt, name="dispatch")
class LoginUserView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            response = supabase.auth.sign_in_with_password(
                {"email": email, "password": password}
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if response.user is None:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Update last login
        try:
            user = User.objects.get(email=email)
            user.last_login = timezone.now()
            user.save(update_fields=["last_login"])
        except User.DoesNotExist:
            pass

        return Response(
            {
                "access_token": response.session.access_token,
                "refresh_token": response.session.refresh_token,
                "user": {
                    "email": response.user.email,
                },
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateProfileView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UpdateProfileSerializer(
            data=request.data, context={"user": request.user}
        )

        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )

        validated_data = serializer.validated_data

        user_fields = ["first_name", "last_name", "username", "phone_number"]
        for field in user_fields:
            if field in validated_data:
                setattr(request.user, field, validated_data[field])
        request.user.save()

        profile_fields = [
            "date_of_birth",
            "bio",
            "street_address",
            "city",
            "state",
            "country",
            "postal_code",
        ]
        profile = request.user.profile
        for field in profile_fields:
            if field in validated_data:
                setattr(profile, field, validated_data[field])
        profile.save()

        user_serializer = UserSerializer(request.user)
        return Response(
            {"message": "Profile updated successfully", "user": user_serializer.data},
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        return self.put(request)


class UpdatePreferencesView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UpdatePreferencesSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )

        profile = request.user.profile
        for field, value in serializer.validated_data.items():
            setattr(profile, field, value)
        profile.save()

        return Response(
            {
                "message": "Preferences updated successfully",
                "preferences": serializer.validated_data,
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        return self.put(request)


class ChangePasswordView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )

        current_password = serializer.validated_data["current_password"]
        new_password = serializer.validated_data["new_password"]

        try:
            auth_response = supabase.auth.sign_in_with_password(
                {"email": request.user.email, "password": current_password}
            )

            if auth_response.user is None:
                return Response(
                    {"error": "Current password is incorrect."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = request.headers.get("Authorization", "").split(" ")[1]
            update_response = supabase.auth.update_user(
                {"password": new_password}, jwt=token
            )

            if update_response.user:
                return Response(
                    {"message": "Password changed successfully"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Failed to update password"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        except Exception as e:
            return Response(
                {"error": f"Failed to change password: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UploadAvatarView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        avatar_file = request.FILES.get("avatar")

        if not avatar_file:
            return Response(
                {"error": "No avatar file provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
        if avatar_file.content_type not in allowed_types:
            return Response(
                {"error": "Invalid file type. Only JPEG, PNG, and GIF are allowed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if avatar_file.size > 5 * 1024 * 1024:
            return Response(
                {"error": "File too large. Maximum size is 5MB."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "message": "Avatar upload endpoint ready",
                "note": "Implement Supabase Storage integration here",
            },
            status=status.HTTP_200_OK,
        )


class DeleteAccountView(APIView):
    authentication_classes = [SupabaseJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        password = request.data.get("password")

        if not password:
            return Response(
                {"error": "Password is required to delete account"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            auth_response = supabase.auth.sign_in_with_password(
                {"email": request.user.email, "password": password}
            )

            if auth_response.user is None:
                return Response(
                    {"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST
                )

            request.user.is_active = False
            request.user.save()

            return Response(
                {"message": "Account deactivated successfully"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": f"Failed to delete account: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )