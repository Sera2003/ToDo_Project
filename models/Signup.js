const mongoose =require('mongoose')

const UserSchema =new mongoose.Schema({

email:String,
password:String,
image:String

})
const UserModel =mongoose.model("signups",UserSchema)
module.exports=UserModel