const mongoose = require('mongoose')   
 
var AdminUserSchema = new mongoose.Schema({
	username : String,
	password : String,
	email : String
})

 
module.exports = mongoose.model('AdminUser', AdminUserSchema);