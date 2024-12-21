const mongoose  = require("mongoose")

const personScheema = new mongoose.Schema({
   userName:{
       type: String,
       unique:true
   } ,
   userEmail : {
      type : String
   },
   userPass : {
    type :String 
   }
}, {
    timestamps : true
}
 )

 module.exports = mongoose.model("person", personScheema)