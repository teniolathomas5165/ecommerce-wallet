"""
Cards App — Views
All views use DRF generic class-based views / ViewSets.
Authentication is enforced globally via DEFAULT_PERMISSION_CLASSES.
"""

from decimal import Decimal
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
)

from .filters import CardFilter, CardTransactionFilter
from .models import Card, CardTransaction
from .serializers import (
    CardCreateSerializer,
    CardSerializer,
    CardStatsSerializer,
    CardStatusUpdateSerializer,
    CardTransactionSerializer,
    CardUpdateSerializer,
)
from .services import CardService
import requests


# ── Cards ViewSet ──────────────────────────────────────────────────────────────

class CardViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    """
    Endpoints:
        GET    /api/cards/                  → list user's cards
        POST   /api/cards/                  → request a new card
        GET    /api/cards/{id}/             → card detail
        PATCH  /api/cards/{id}/             → update cosmetic fields
        POST   /api/cards/{id}/freeze/      → freeze card
        POST   /api/cards/{id}/unfreeze/    → unfreeze card
        POST   /api/cards/{id}/block/       → block card (irreversible)
        POST   /api/cards/{id}/set-default/ → make this the default card
    """

    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CardFilter
    search_fields = ["last_four", "holder_name"]
    ordering_fields = ["created_at", "balance"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Card.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return CardCreateSerializer
        if self.action in ("update", "partial_update"):
            return CardUpdateSerializer
        if self.action == "status_action":
            return CardStatusUpdateSerializer
        return CardSerializer

    def perform_create(self, serializer):
        CardService.create_card(
            user=self.request.user,
            validated_data=serializer.validated_data,
        )

    def update(self, request, *args, **kwargs):
        kwargs["partial"] = True    # always treat as PATCH
        return super().update(request, *args, **kwargs)

    # ── Custom actions ─────────────────────────────────────────────────────────

    @action(detail=True, methods=["post"], url_path="freeze")
    def freeze(self, request, pk=None):
        card = self.get_object()
        if card.status != "ACTIVE":
            return Response(
                {"detail": f"Cannot freeze a card with status '{card.status}'."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        card.freeze()
        return Response(CardSerializer(card).data)

    @action(detail=True, methods=["post"], url_path="unfreeze")
    def unfreeze(self, request, pk=None):
        card = self.get_object()
        if card.status != "FROZEN":
            return Response(
                {"detail": "Only frozen cards can be unfrozen."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        card.unfreeze()
        return Response(CardSerializer(card).data)

    @action(detail=True, methods=["post"], url_path="block")
    def block(self, request, pk=None):
        card = self.get_object()
        if card.status == "BLOCKED":
            return Response(
                {"detail": "Card is already blocked."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        card.block()
        return Response(CardSerializer(card).data)

    @action(detail=True, methods=["post"], url_path="set-default")
    def set_default(self, request, pk=None):
        card = self.get_object()
        updated = CardService.set_default_card(user=request.user, card=card)
        return Response(CardSerializer(updated).data)

    @action(detail=False, methods=["post"], url_path="add-paystack-card")
    def add_paystack_card(self, request):
        """
        Add a new card via Paystack authorization reference.
        Expects JSON payload:
        {
            "reference": "PS_xxxxx"
        }
        """
        reference = request.data.get("reference")
        if not reference:
            return Response({"detail": "Reference is required."}, status=400)

        # Verify transaction with Paystack
        url = f"https://api.paystack.co/transaction/verify/{reference}"
        headers = {"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"}
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            return Response({"detail": "Failed to verify transaction."}, status=400)

        data = resp.json().get("data")
        if not data or not data.get("authorization"):
            return Response({"detail": "Invalid authorization data."}, status=400)

        auth = data["authorization"]
        card_type = auth["brand"].upper()
        last_four = auth["last4"]
        exp_month = int(auth["exp_month"])
        exp_year = int(auth["exp_year"])
        authorization_code = auth["authorization_code"]

        # Create Card
        card = Card.objects.create(
            user=request.user,
            card_type=card_type,
            card_category="VIRTUAL",
            holder_name=request.user.get_full_name(),
            last_four=last_four,
            expiry_month=exp_month,
            expiry_year=exp_year,
            color_gradient="from-blue-600 to-blue-800",
            accent_color="#3b82f6",
            external_card_id=authorization_code,
        )

        serializer = CardSerializer(card)
        return Response(serializer.data, status=201)


# ── Card Stats View ────────────────────────────────────────────────────────────

class CardStatsView(APIView):
    """
    GET /api/cards/stats/
    Returns the aggregated stats row shown above the cards grid:
    total_limit, used_credit, available, cashback.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        stats = CardService.get_card_stats(user=request.user)
        serializer = CardStatsSerializer(stats)
        return Response(serializer.data)


# ── Card Transactions ──────────────────────────────────────────────────────────

class CardTransactionListView(generics.ListAPIView):
    """
    GET /api/cards/transactions/
    Lists all card transactions for the authenticated user.
    Supports filtering by card, category, direction, date range, etc.

    Mirrors the "Recent Card Activity" section in the frontend, including
    the "All Cards / **** XXXX" dropdown filter.
    """

    serializer_class = CardTransactionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CardTransactionFilter
    search_fields = ["merchant", "reference"]
    ordering_fields = ["created_at", "amount"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return CardTransaction.objects.filter(
            card__user=self.request.user
        ).select_related("card")


class CardTransactionDetailView(generics.RetrieveAPIView):
    """
    GET /api/cards/transactions/{id}/
    """

    serializer_class = CardTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CardTransaction.objects.filter(card__user=self.request.user)
