import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../../lib/plaid';

export default withIronSessionApiRoute(exchangePublicToken, sessionOptions);

async function exchangePublicToken(req, res) {
  if (req.method === 'POST') {
    try {
      const { public_token } = req.body;
      const response = await plaidClient.itemPublicTokenExchange({ public_token });
      req.session.access_token = response.data.access_token;
      req.session.item_id = response.data.item_id;
      await req.session.save();
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}