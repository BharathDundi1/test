const express = require("express");
const app = express();
const client = require("prom-client");
const responseTime = require("response-time");
const port = 80;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get(`/`, (req, res) => {
  res.send("Hello world");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  return res.send(await client.register.metrics());
});

app.listen(port, () => {
  console.info(`Express app listening at http://localhost:${port}`);
});
