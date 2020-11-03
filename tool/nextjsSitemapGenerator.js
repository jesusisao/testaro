/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require("nextjs-sitemap-generator");
const path = require("path");
const fs = require("fs");
const format = require("xml-formatter");

const generateSitemap = async () => {
  await sitemap({
    baseUrl: "https://testaro.somewhere.gq",
    pagesDirectory: path.resolve(__dirname + "/../src/pages"),
    targetDirectory: "out/",
    sitemapFilename: "sitemap.xml",
    excludeIndex: "true",
    ignoredExtensions: ["png", "jpg", "scss"],
  });

  const filePath = "./out/sitemap.xml";
  const text = fs.readFileSync(filePath, "utf-8");
  // 標準で出力されるurlsetに余計なものが沢山ついているので置き換える
  const urlset = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  // プロジェクトの構造上不要な/indexがついてしまうので除去する
  // 生成されるスクリプトはインデントが揃ってないのでformatもする。
  const newText = format(
    text.replace(/<urlset[\s\S]*?>/, urlset).replace(/\/index/g, "")
  );

  fs.writeFile(filePath, newText, (err) => {
    if (err) throw err;
  });
};

generateSitemap();

console.log(`✅ sitemap.xml generated!`);
