/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require("nextjs-sitemap-generator");
const path = require("path");
const fs = require("fs");

const generateSitemap = async () => {
  await sitemap({
    baseUrl: "https://testaro.somewhere.gq",
    pagesDirectory: path.resolve(__dirname + "/../src/pages"),
    targetDirectory: "out/",
    sitemapFilename: "sitemap.xml",
    excludeIndex: "true",
    ignoredExtensions: ["png", "jpg", "scss"],
  });

  // プロジェクトの構造上不要な/indexがついてしまうので除去する
  const filePath = "./out/sitemap.xml";
  const text = fs.readFileSync(filePath, "utf-8");
  const newText = text.toString().replace(/\/index/g, "");

  fs.writeFile(filePath, newText, (err) => {
    if (err) throw err;
  });
};

generateSitemap();

console.log(`✅ sitemap.xml generated!`);
