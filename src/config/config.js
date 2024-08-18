import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  MAILER: {
    HOST: process.env.MAILER_HOST,
    PORT: process.env.MAILER_PORT,
    AUTH: {
      USER: process.env.MAILER_USER,
      PASS: process.env.MAILER_PASS,
    }
  }
};
