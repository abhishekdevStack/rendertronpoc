const express = require("express");
const fetch = require("node-fetch");
const url = require("url");
const app = express();
const path = require("path");
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
  console.log("detect bot function called");
  // List of bots to target, add more if you'd like
  const bots = [
    // crawler bots
    "googlebot",
    "bingbot",
    "yandexbot",
    "duckduckbot",
    "slurp",
    // link bots
    "twitterbot",
    "facebookexternalhit",
    "linkedinbot",
    "embedly",
    "baiduspider",
    "pinterest",
    "slackbot",
    "vkShare",
    "facebot",
    "outbrain",
    "W3C_Validator",
  ];
  const agent = userAgent.toLowerCase();
  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) {
      console.log("bot detected", bot, agent);
      return true;
    } else {
      console.log("sorry !bot not detected");
    }
  }
  console.log("no bots found");
  return false;
}

app.get("*", (req, res) => {
  const isBot = detectBot(req.headers["user-agent"]);
  if (isBot) {
    const botUrl = generateUrl(req);
    // If Bot, fetch url via rendertron
    fetch(`${renderUrl}/${botUrl}`)
      .then((res) => res.text())
      .then((body) => {
        // Set the Vary header to cache the user agent, based on code from:
        // https://github.com/justinribeiro/pwa-firebase-functions-botrender
        res.set("Cache-Control", "public, max-age=300, s-maxage=600");
        res.set("Vary", "User-Agent");
        console.log(`url-format-${renderUrl}/${botUrl}`);
        console.log(`bot-url-${botUrl}`);
        console.log("body->", body.toString());
        res.send(body.toString());
      });
  } else {
    console.log("you are a human!");
    res.sendFile(path.join(__dirname, "dist/my-first-app"));
  }
});
// app.use(function (req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });
app.use(express.static(path.join(__dirname, "dist/my-first-app")));
app.use("*", express.static(path.join(__dirname, "dist/my-first-app")));
app.listen(3000, function () {
  console.log("Vola!! The app is listening on port 3000!");
});
module.exports = app;
