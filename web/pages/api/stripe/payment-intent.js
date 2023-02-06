import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: process.env.NEXT_PUBLIC_STRIPE_API_VERSION,
})

export default async function createPaymentIntent(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      })

      res.status(200).send(paymentIntent.client_secret)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
