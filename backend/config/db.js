const mongoose = require('mongoose');

const connectDB = async() => {
        try {
                await mongoose.connect(process.env.DATABASE)
                console.log('Connected to ' + process.env.DATABASE)
        } catch (error) {
                console.log(error)
                process.exit(1)
        }
}

module.exports = connectDB;