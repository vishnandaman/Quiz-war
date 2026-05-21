module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Pass");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  var pass = req.headers["x-admin-pass"];
  if (!pass || pass !== process.env.ADMIN_PASS) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  var url = process.env.SUPABASE_URL;
  var key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    return res.status(500).json({
      error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server",
    });
  }

  try {
    var upstream = await fetch(url + "/rest/v1/votes?id=gt.0", {
      method: "DELETE",
      headers: {
        apikey: key,
        Authorization: "Bearer " + key,
        Prefer: "return=minimal",
      },
    });
    if (!upstream.ok) {
      var errText = await upstream.text();
      return res.status(upstream.status).json({ error: errText });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
};
