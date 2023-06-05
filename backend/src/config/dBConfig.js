const mongoose = require("mongoose");
const dbConfig =
  "mongodb+srv://pdr606:pdradmin@cluster0.uq0mc8b.mongodb.net/annotations?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(dbConfig, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB 🚀");
    return connection;
  } catch (error) {
    console.log("Houve um erro ao se conectar ao MongoDB", error);
    throw error;
  }
}

module.exports = connectToDatabase();
