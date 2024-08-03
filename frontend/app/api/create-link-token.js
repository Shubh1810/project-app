import { plaidClient } from '../../lib/plaid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const tokenResponse = await plaidClient.linkTokenCreate({
        user: { client_user_id: process.env.PLAID_CLIENT_ID },
        client_name: "Plaid's Tiny Quickstart",
        language: 'en',
        products: ['auth'],
        country_codes: ['US'],
        redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
      });

      return res.json(tokenResponse.data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}