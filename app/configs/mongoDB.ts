import mongoose, { ConnectOptions } from "mongoose";

const connectDB = (): Promise<any> =>
  mongoose
    .connect(process.env.MONG_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions)
    .then((config): void =>
      console.log(`MongoDB Connected: ${config.connection.host}`)
    )
    .catch((error: any): void => console.error(`Error: ${error.message}`));

export default connectDB;
