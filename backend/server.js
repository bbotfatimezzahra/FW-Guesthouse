const express = require('express');
const dotenv = require('dotenv').config();
const colors =require('colors');
const{errorHandler, corserrorHandler}=require('./middleware/errorMiddleware');
const connectDB=require('./config/db')
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(corserrorHandler);

app.use('/api/bookings',require('./routes/bookingRoutes'));

app.use('/api/rooms',require('./routes/roomRoutes'));

app.use('/api/users',require('./routes/userRoutes'));

app.use('/api/events',require('./routes/eventRoutes'));

app.use('/api/services',require('./routes/serviceRoutes'));

app.use(errorHandler);


app.listen(port, ()=>console.log(`app started at port ${port}`));

