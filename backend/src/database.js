const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mean_graphql";

(async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("BD conectada correctamente");
  } catch (err) {
    console.error("Error al conectar la BD:", err);
  }
})();

module.exports = mongoose;
