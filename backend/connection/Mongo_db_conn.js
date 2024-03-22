const mongoose = require("mongoose");

const Mongo_db_conn = () => {
  mongoose
    .connect(
        process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    })
};

module.exports = Mongo_db_conn;
