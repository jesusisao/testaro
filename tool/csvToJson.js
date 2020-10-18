const fs = require('fs');
const csvSync = require('csv-parse/lib/sync');

const file = 'tool/x-ken-all.csv';
const data = fs.readFileSync(file);
const res = csvSync(data); // Array<Array<string>>

const hashArray = [];
for (const row of res) {
    hashArray.push({
        'postalCode': row[2],
        'prefectureKana': row[3],
        'cityKana': row[4],
        'townAreaKana': row[5],
        'prefecture': row[6],
        'city': row[7],
        'townArea': row[8]
    })
}

const jsonString = JSON.stringify(hashArray)

fs.writeFile('tool/kenAll.json', jsonString, (err) => {
    if (err) { throw err; }
    console.log('tool/kenAll.jsonが作成されました');
});

console.log(hashArray);
