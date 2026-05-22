import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose
      .connect(
        `${process.env.MONGO_URL}`,
      )
      .then(() => {
        console.log("db is connected");
      });
  } catch (error) {
    console.log("db is not connected");
  }
};

export default connection;
