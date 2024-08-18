import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/coder69900';

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos en MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}
