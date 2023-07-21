require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet')
const { mongoose } = require('mongoose');
const { errors } = require('celebrate');
const serverError = require('./errors/ServerError');
const router = require('./routes/indexRouter');

const { PORT = 3001 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(express.json());
app.use(cookieParser());

// const allowedCors = [
//   'pract.dvkonstantinov.ru',
//   '127.0.0.1:3000',
//   'http://localhost:3000',
// ];
app.use(cors({
  origin: [
    // 'https://pract.dvkonstantinov.ru',
    // 'http://pract.dvkonstantinov.ru',
    'http://localhost:3000',
    // 'http://localhost:3001',
    // 'http://127.0.0.1:3000',
    // 'localhost:3000',
    // '127.0.0.1',
    // 'localhost',
  ],
  credentials: true,
  // optionsSuccessStatus: 200,
}));
// app.use(cors());
app.use(helmet());
// app.use((req, res, next) => {
//   const { origin } = req.headers;
//   console.log(origin);
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   const { method } = req;
//   console.log(method);
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(router);
app.use(errors());
app.use(serverError);

app.listen(PORT);
