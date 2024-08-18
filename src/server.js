import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import routes from "./routes/index.js"
import { initializePassport } from './config/passportConfig.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { config } from './config/config.js';

const app = express();
const PORT = 8080;

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(errorHandler);

// Passport
initializePassport();
app.use(passport.initialize());

// Routes
app.use('/api', routes);

// Mongo
mongoose
    .connect(config.MONGO_URI)
    .then(() => {
        console.log("Conectado a MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
