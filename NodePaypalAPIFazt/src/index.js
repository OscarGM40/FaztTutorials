import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// const express = require('express');
import morgan from 'morgan';
// const morgan = require('morgan');
import cors from 'cors';
// const cors = require('cors')
import paymentRoutes from './routes/payments.routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/payments', require('./routes/payments.routes'));
app.use('/payments', paymentRoutes);

app.listen(3000, () => {
  console.clear();
  console.log('Server started on port 3000');
});