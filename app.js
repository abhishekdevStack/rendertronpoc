var express = require("express");
var path = require("path");
var fs = require("fs");
const rendertron = require("rendertron-middleware");

var app = express();

const bots = [
  "baiduspider",
  "bingbot",
  "embedly",
  "facebookexternalhit",
  "linkedinbot",
  "outbrain",
  "pinterest",
  "quora link preview",
  "rogerbot",
  "showyoubot",
  "slackbot",
  "twitterbot",
  "vkShare",
  "W3C_Validator",
  "whatsapp",
  "mozilla/5.0 (x11; linux x86_64) applewebkit/537.36 (khtml, like gecko) headlesschrome/79.0.3945.0 safari/537.36",
  "mozilla",
  "applewebkit",
  "headlesschrome",
];
const BOTS = rendertron.botUserAgents.concat(bots.join(","));
const BOT_UA_PATTERN = new RegExp(BOTS.join("|"), "i");
app.use(
  rendertron.makeMiddleware({
    proxyUrl: "https://crwn-db-2a4e6.uc.r.appspot.com/render",
    userAgentPattern: BOT_UA_PATTERN,
  })
);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname));
});

app.get("*", express.static(path.join(__dirname, "/dist/my-first-app")));

module.exports = app;
