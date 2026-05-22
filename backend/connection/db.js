import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://parthpanchal:parth123@authentication.uvh4pnx.mongodb.net/crmsystem",
      )
      .then(() => {
        console.log("db is connected");
      });
  } catch (error) {
    console.log("db is not connected");
  }
};

export default connection;
