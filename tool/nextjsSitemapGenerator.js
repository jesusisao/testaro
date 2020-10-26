/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

sitemap({
  baseUrl: "https://testaro.netlify.app",
  pagesDirectory: path.resolve(__dirname + "/../src/pages"),
  targetDirectory: "out/",
  sitemapFilename: "sitemap.xml",
  ignoredExtensions: ["png", "jpg", "scss"],
});

console.log(`✅ sitemap.xml generated!`);
