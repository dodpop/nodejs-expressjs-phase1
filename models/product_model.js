const mongoose = require('mongoose')   
 
var ProductSchema = new mongoose.Schema({
	sku : String,
	name : String,
	price : Number,
	description : String
})

const products = mongoose.model('products', ProductSchema);

module.exports = products;
 
// module.exports = mongoose.model('products', ProductSchema);