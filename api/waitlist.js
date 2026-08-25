// Serverless function: /api/waitlist
// Stores + reads waitlist signups using Vercel KV (set up once from the Vercel dashboard).
const { kv } = require('@vercel/kv');

const LIST_KEY = 'vera:waitlist';

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      const entry = {
        fullname: (body.fullname || '').toString().trim(),
        email: (body.email || '').toString().trim(),
        phone: (body.phone || '').toString().trim(),
        timestamp: new Date().toISOString()
      };
      if (!entry.email && !entry.fullname) {
        return res.status(400).json({ ok: false, error: 'missing fields' });
      }
      await kv.rpush(LIST_KEY, JSON.stringify(entry));
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ ok: false, error: String(err && err.message || err) });
    }
  }

  if (req.method === 'GET') {
    const key = (req.query && req.query.key) || '';
    if (!process.env.ADMIN_KEY) {
      return res.status(500).json({ ok: false, error: 'not-configured' });
    }
    if (key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }
    try {
      const raw = await kv.lrange(LIST_KEY, 0, -1);
      const entries = raw
        .map((r) => (typeof r === 'string' ? JSON.parse(r) : r))
        .reverse(); // newest first
      return res.status(200).json({ ok: true, entries });
    } catch (err) {
      return res.status(500).json({ ok: false, error: String(err && err.message || err) });
    }
  }

  res.status(405).json({ ok: false, error: 'method not allowed' });
};
