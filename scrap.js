const scrapper = require("puppeteer")
const urlToScrap="https://news.google.com/search?cryptocurrency world&q=cryptocurrency world when:1d";
const storedata=require("./storage")
const storage=new storedata()

async function scraper(){
    const browserOptions={headless:true,args:["--incognito","--no-sandbox","--single-process","--no-zygote","--disable-setuid-sandbox"]};
	  const browser=await scrapper.launch(browserOptions);
    const page=await browser.newPage();
    await page.goto(urlToScrap,{'waitUntil':'domcontentloaded'});
    
    page.setViewport({ width: 1366, height: 768 })
    page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')

    let data=await page.evaluate(()=>{
        let scrapedData=[];
      

        let datax=document.querySelectorAll('div[class="NiLAwe y6IFtc R7GTQ keNKEd j7vNaf nID9nc"]');

        datax.forEach((x)=>{
          let z={
            "title":x.querySelector('h3[class="ipQwMb ekueJc RD0gLb"]>a').innerText||false,
            "image":x.querySelector('img[class="tvs3Id QwxBBf"]').getAttribute('src')||false,
            "link":x.querySelector('a[class="DY5T1d RZIKme"]').getAttribute('href').replace('./','https://news.google.com/')||false,
            "source":x.querySelector('a[class="wEwyrc AVN2gc uQIVzc Sksgp"]').innerText||false,
            "time":x.querySelector('time[class="WW6dff uQIVzc Sksgp"]').innerText||false
          }

         scrapedData.push(z);

      })
      return scrapedData;
   });

    await browser.close()
    await storage.savedata(data)
    return data;
}


module.exports=scraper