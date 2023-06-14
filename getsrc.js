const fetch=require("superagent")
const cheerio = require("cheerio")
const storedata=require("./storage")
const storage=new storedata()


async function getSrcUrl(data){
	let x=0;
    try{
      await Promise.all(data.map(async(li)=>{
         fetch.get(li.link).then(res=>{
			const _$ = cheerio.load(res.text);
	        li.link= _$('c-wiz a[rel=nofollow]').attr('href')
	        x+=1;
	        if(x==data.length){
	           console.log("Finished to fetch");
	           if(data.length!=0){
	           	storage.savedata(data)
	           }
	         };
		  })
         .catch(err=>{
         	console.log(err.message)
         })
			 
		}));
    }catch(error){
      throw new Error(error)
    }
}


module.exports=getSrcUrl;