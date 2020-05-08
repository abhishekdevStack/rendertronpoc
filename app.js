var express = require("express");
var path = require("path");
var fs = require("fs");
const rendertron = require("rendertron-middleware");
const url = require("url");
var app = express();
const fetch = require("node-fetch");

// app.use(
//   rendertron.makeMiddleware({
//     proxyUrl: "https://crwn-db-2a4e6.uc.r.appspot.com/",
//     userAgentPattern: new RegExp(bots.join("|"), "i"),
//   })
// );
const appUrl = "arcane-ridge-37333.herokuapp.com";
const renderUrl = "https://crwn-db-2a4e6.uc.r.appspot.com/render";

function generateUrl(request) {
  return url.format({
    protocol: request.protocol,
    host: appUrl,
    pathname: request.originalUrl,
  });
}
function detectBot(userAgent) {
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
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
  ];
  console.log(userAgent);
  const agent = userAgent.toLowerCase();
  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) {
      console.log("bot detected", bot.agent);
      return true;
    }
  }
  console.log("no bots detected");
  return false;
}
app.get("/*", function (req, res) {
  //   res.sendFile(path.join(__dirname));
  const isBot = detectBot(req.headers["user-agent"]);
  if (isBot) {
    const botUrl = generateUrl(req);
    console.log("botUrl", botUrl);
    fetch(`${renderUrl}/${botUrl}`)
      .then((res) => res.text())
      .then((body) => {
        res.send(body.toString());
      });
  } else {
    res.sendFile(path.join(__dirname));
  }
});

app.use(express.static(path.join(__dirname, "/dist/my-first-app")));
app.use("*", express.static(path.join(__dirname, "/dist/my-first-app")));

module.exports = app;
