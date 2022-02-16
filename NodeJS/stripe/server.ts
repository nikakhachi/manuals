import express, { Response, Request, Application } from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import cors from "cors";
import { Stripe } from "stripe";
dotenv.config({ path: __dirname + "/.env" });
const stripe: Stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app: Application = express();

app.use(express.json());
app.use(cors());

const store = [
  { id: 1, name: "Red Bull Hoodie", priceInCents: 10000 },
  { id: 2, name: "F1 Cup", priceInCents: 2500 },
];

app.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item: any) => {
        const storeItem = store.find((item2) => item2.id === item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem?.name,
            },
            unit_amount: storeItem?.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session?.url });
  } catch (error: any) {
    res.status(500).json({ error: error.raw.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`));
