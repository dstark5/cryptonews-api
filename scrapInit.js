const scraper=require("./scrap")
const geturl=require("./getsrc")


async function initialize() {
	scrapInit()
	setInterval(scrapInit,3*60*60*1000)
}

async function scrapInit(){
  try{
    var x=await scraper()
    if(x.length!=0){
      await geturl(x)
    }else{
      scrapInit()
    }
  }catch(err){
    console.log(err)
    setTimeout(scrapInit,25* 1000)
  }
}

module.exports=initialize