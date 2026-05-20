module.exports = async function (req, res) {
  var scriptUrl = process.env.SCRIPT_URL;
  if (!scriptUrl) {
    return res.status(500).json({ error: "SCRIPT_URL not configured" });
  }

  var params = new URLSearchParams(req.query);
  params.delete("_t");
  params.delete("callback");

  try {
    var response = await fetch(scriptUrl + "?" + params.toString(), {
      redirect: "follow",
    });
    var text = await response.text();
    var data = JSON.parse(text);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
