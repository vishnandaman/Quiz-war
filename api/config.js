module.exports = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.status(200).json({
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_KEY: process.env.SUPABASE_KEY || "",
    ADMIN_PASS: process.env.ADMIN_PASS || "",
    POLL_INTERVAL_VOTER: parseInt(process.env.POLL_INTERVAL_VOTER) || 8000,
    POLL_INTERVAL_ADMIN: parseInt(process.env.POLL_INTERVAL_ADMIN) || 5000
  });
};
