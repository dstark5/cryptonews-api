var file=require("fs")
var path=require("path")


class storage{
  constructor(){
    this.filename="data.json"
  }

  getdata(){
    return new Promise(async(resolve, reject) => {
      try{
          await file.readFile(path.join(__dirname,this.filename), 'utf-8',(error,data)=>{
          if(error){
            reject(error)
          }else{
            var data=JSON.parse(data);
            resolve(data)
          }
        })
        }catch(err){
          reject(error)
        }
      
    });
  }

  async savedata(data){
    var jsonData=JSON.stringify(data)
    try{
      await file.writeFile(path.join(__dirname,this.filename),jsonData, 'utf-8',(error,data)=>{
        if(error){
          console.log("error");
        }else{
          console.log("saved");
        }
      });
    }catch(err){
      console.log(err)
    }
  }
}


module.exports=storage