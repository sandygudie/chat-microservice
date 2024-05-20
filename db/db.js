const mongoose = require('mongoose')

const connectToDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Database connected successfully')
    })
    .catch((error) => {
      console.error('error connecting to MongoDB:', error.message)
    })
}

const disconnectDB = async () => {
  await mongoose.disconnect()
}

module.exports = { connectToDB, disconnectDB }
