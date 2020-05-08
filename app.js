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
];
app.set("view engine", "ejs");
app.use(
  rendertron.makeMiddleware({
    proxyUrl: "https://crwn-db-2a4e6.uc.r.appspot.com/render",
  })
);
// Set 'views' directory for any views
// being rendered res.render()
app.set("views", path.join(__dirname, "views"));
console.log(path.join(__dirname, "views"));
app.get("/testing", function (req, res) {
  let metaTagInfo = [
    {
      image:
        "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];
  res.render("pages/testing.ejs", { metaTagInfo: metaTagInfo });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname));
});

app.use(express.static(path.join(__dirname, "/dist/my-first-app")));
app.use("*", express.static(path.join(__dirname, "/dist/my-first-app")));

module.exports = app;
