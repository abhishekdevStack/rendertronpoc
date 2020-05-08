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
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  "facebookexternalhit/1.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
  "facebookexternalhit/1.0 (+http://www.facebook.com/externalhit_uatext.php)",
  "facebookexternalhit/1.1;line-poker/1.0",
  "facebookexternalhit/1.1; kakaotalk-scrap/1.0; +https://devtalk.kakao.com/t/scrap/33984",
  "facebookexternalhit/1.1;kakaotalk-scrap/1.0; +https://devtalk.kakao.com/t/scrap/33984",
  "facebookexternalhit/1.1 ( http://www.facebook.com/externalhit_uatext.php)",
  "facebookexternalhit/1.1 (compatible;)",
  "facebookexternalhit/1.1;kakaotalk-scrap/1.0;",
  "Mozilla/5.0 (compatible; The Lounge IRC Client; +https://github.com/thelounge/thelounge) facebookexternalhit/1.1 Twitterbot/1.0",
  "RemindPreview/1.0 facebookexternalhit/1.0",
  "facebookexternalhit/1.1;belly-scrap/1.0; +https://blog.naver.com/whaleteam/221250531643",
  "facebookexternalhit/1.1 (+https://www.facebook.com/externalhit_uatext.php)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/601.2.4 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.4 facebookexternalhit/1.1 Facebot Twitterbot/1.0",
  "facebookexternalhit/1.1 (compatible; Blueno/1.0; +http://naver.me/scrap)",
  "facebookexternalhit/1.1;between-scrap/1.0",
  "bandscraper ( facebookexternalhit/1.1 )",
  "facebookexternalhit/1.1;goscraper/1.0;",
];
// app.set("view engine", "ejs");
app.use(
  rendertron.makeMiddleware({
    proxyUrl: "https://crwn-db-2a4e6.uc.r.appspot.com/render",
    userAgentPattern: new RegExp(bots.join("|"), "i"),
  })
);
// Set 'views' directory for any views
// being rendered res.render()
// app.set("views", path.join(__dirname, "views"));
// console.log(path.join(__dirname, "views"));
// app.get("/testing", function (req, res) {
//   let metaTagInfo = [
//     {
//       image:
//         "https://images.pexels.com/photos/47367/full-moon-moon-bright-sky-47367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//     },
//   ];
//   res.render("pages/testing.ejs", { metaTagInfo: metaTagInfo });
// });
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname));
// });
app.get("/testing", function (req, res) {
  console.log(req.get("User-Agent"));
});

app.use(express.static(path.join(__dirname, "/dist/my-first-app")));
app.use("*", express.static(path.join(__dirname, "/dist/my-first-app")));

module.exports = app;
