// src/utils/loadPaystack.ts
export function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PaystackPop) {
      resolve(); // already loaded
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack script"));
    document.head.appendChild(script);
  });
}