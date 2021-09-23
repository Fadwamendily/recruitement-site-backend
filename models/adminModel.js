const mongoose=require('mongoose')
const Schema = mongoose.Schema

const userModel = require('./UserModel');

const adminSchema = new Schema(
    
    
   

)

module.exports=userModel.discriminator('admin',adminSchema);