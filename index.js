const express=require("express")
const app=express()
const scrapInit=require("./scrapInit")
const storedata=require("./storage")
const storage=new storedata()
const rateLimit = require("express-rate-limit")

app.listen(process.env.PORT||3000,async()=>{
  console.log("started")
  scrapInit()  
})

const apiLimiter = rateLimit({
  windowMs: 1*60*1000,
  max: 25,
  standardHeaders:true,
  legacyHeaders: false,
})


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});


app.set('trust proxy', 5)

app.get('/',apiLimiter,async(req,res)=>{
  storage.getdata().then(data=>{
    res.json(data)
  }).catch(err=>{
    res.sendStatus(404)
  })
})