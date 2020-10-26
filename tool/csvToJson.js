/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const csvSync = require("csv-parse/lib/sync");
const sampleSize = require("lodash.samplesize");

const file = "tool/x-ken-all.csv";
const data = fs.readFileSync(file);
const res = csvSync(data); // Array<Array<string>>

const hashArray = [];
for (const row of res) {
  hashArray.push({
    postalCode: row[2],
    prefectureKana: row[3],
    cityKana: row[4],
    townAreaKana: row[5],
    prefecture: row[6],
    city: row[7],
    townArea: row[8],
  });
}

// やりたいことはあくまでランダムに住所を出したいだけ。
// 全件ファイル出力にするとあまりに重すぎるので一定数のみ抽出する。
const choosedArray = sampleSize(hashArray, 5000);
const jsonString = JSON.stringify(choosedArray);

fs.writeFile("tool/kenMini.json", jsonString, (err) => {
  if (err) {
    throw err;
  }
  console.log("tool/kenMini.jsonが作成されました");
});
