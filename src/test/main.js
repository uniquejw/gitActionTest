import fs from 'fs';
import path, { join } from 'path';

import {BaseCrawler} from './BaseCrawler.js';
import {Naning9Model} from './Naning9.js';

   
(async () => {
   
   console.log('start');

   const crawler = new BaseCrawler();
 
   const dataJson = fs.readFileSync('./src/test/mainCate.json',{encoding:'utf8'})
   const Obj = JSON.parse(dataJson)

   
   const runJob = async url => {
     return await crawler.run(url, () => {
       const elementToArray = list => Array.prototype.slice.apply(list);
       const productItems = elementToArray(document.querySelectorAll('.product-list .product-item'));
      console.log(productItems.length)
       if (!productItems.length) {
         return null;
       }
 
       return productItems.map(item => {
         console.log(item)
         const id = item
           .querySelector('a')
           ?.getAttribute('href')
           .match(/index_no=(\d+)/)[1];
         const name = item.querySelector('.product-info__name')?.outerText;
         const thumbnail = item.querySelector('.product-thumnail > img')?.getAttribute('src');
         const hasDiscountPrice = item.querySelector('.product-info__price > .product-info__price-default');
         const price = hasDiscountPrice
           ? item.querySelector('.product-info__price > .product-info__price-default').outerText
           : item.querySelector('.product-info__price')?.childNodes[0].textContent.trim().replace("\n","");
         const discountPrice = hasDiscountPrice
           ? item.querySelector('.product-info__price')?.childNodes[0].textContent.trim().replace("\n","")
           : 0;
 
         return {
           id,
           name,
           thumbnail,
           price,
           discountPrice
         };
       });
     });
   };
   const final = {}
   
   for (const rs of Obj) {
      const result = await runJob(rs.cUrl)
      final[rs.name] = result
      // const data = result.map(item => new Naning9Model().setParamsValues(item).toData());
      // console.log('data', data)
   }
   console.log(final)
   
   crawler.destroy();
   
   fs.writeFileSync('./src/test/main.json', JSON.stringify(final))
})();
 
