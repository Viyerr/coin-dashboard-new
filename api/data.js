let total = 0;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ total });
  }

  if (req.method === 'POST') {
    try {
      const { coinCount } = req.body;
      const amount = parseFloat(coinCount);

      if (isNaN(amount)) {
        return res.status(400).json({ error: "Invalid coinCount" });
      }

      total += amount;
      if (total < 0) total = 0;

      return res.status(200).json({ total });
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
