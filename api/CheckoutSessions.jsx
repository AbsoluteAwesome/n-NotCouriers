import Stripe from "stripe";

const STRIPE_KEY =
  "sk_test_51OCuOGFYugXoejNermbFNmf8hMISM6MaaoSCHOfuRjbICZLkRpH5X6QRRXxivZa105zX23APUZ1PCOvkCHa9Ki8Q00iXpkk2UC";

const stripe = new Stripe(STRIPE_KEY);

export default async function CheckoutSessions(data) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: "prod_P0yhyiTzbZLWrC",
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    window.location.href = session.url;
    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      error: "Internal Server Error",
    };
  }
}
