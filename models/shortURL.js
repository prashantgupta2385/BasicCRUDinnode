const mongoose=require("mongoose");

const shortURLSchema=mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true

    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamp:{
        type:Number
    }
    }]
    ,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{timestamps:true});

const shorturls=mongoose.model("shorturls",shortURLSchema)
module.exports=shorturls