const mongoose = require('mongoose') 


const addpersonschema = new mongoose.Schema({
    username : {
        type :String,
        unique : true

    },

    useremail : {
        type : String ,

    },

    userpass : {
        type : String 
    }
}

)

module.exports = mongoose.model("person",addpersonschema)