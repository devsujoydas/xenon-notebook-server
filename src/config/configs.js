require('dotenv').config();

exports.PORT = process.env.PORT; 
exports.MONGO_URI = process.env.MONGO_URI
exports.JWT_SECRET = process.env.JWT_SECRET 