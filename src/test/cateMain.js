import fs from 'fs';
import path, { dirname } from 'path';

import {CateCrawler} from './CateCrawler.js';
import {cateModel} from './CateModel.js';

const __dirname = path.resolve();

(async () => {

   console.log('start');
 
   const crawler = new CateCrawler();
 
   const runJob = async url => {
     return await crawler.run(url, () => {
       const elementToArray = list => Array.prototype.slice.apply(list);
       const productItems = elementToArray(document.querySelectorAll('body > div.header > div.header-bottom > div.header-bottom__menu.header-bottom__menu--right > ul > .header-bottom__menu-item'));
 
       if (!productItems.length) {
         return null;
       }
 
       return productItems.map(item => {
        const name = item.outerText; 
        const cUrl = item
           .querySelector('a')
           ?.href
         
         
         return {
          name,
          cUrl
         };
       });
     });
   };
 
   const result = await runJob("https://www.naning9.com/index.php");
  //  console.log(result)
   const data = result.map(item => new cateModel().setParamsValues(item).toData());
   // console.log('result', result);
   //  console.log('data', data);
   
   await crawler.destroy();

   console.log(JSON.stringify(result))
   fs.writeFileSync('./src/test/mainCate.json', JSON.stringify(result))
  })();
 
