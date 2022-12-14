const {GoogleSpreadsheet} = require("google-spreadsheet");
const { docs } = require("googleapis/build/src/apis/docs");

const result = require("./main.json");
const creds = require("./puppeteer-crawler-360413-144df533ba44.json");

(async () => {
  const doc = new GoogleSpreadsheet('1c0l3SDTMe14fbddN2IZVuGh1eVSIUPuWeT9ABeyMqFI');

  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  
  let object = []
  object = Object.keys(result)
  let i = 0;
  for (const iterator of object) {
      
    const sheet = doc.sheetsByIndex[i]
  // append rows
    await sheet.clear();
    let Key = ["id", "name", "thumbnail", "price", "discountPrice"]
    await sheet.setHeaderRow(Key);
    await sheet.addRows(result[iterator]);
    i++;
} 
// await sheet.addRows(result.ACCESSORY);
  
  
})();