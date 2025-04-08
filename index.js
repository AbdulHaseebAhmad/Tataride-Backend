import express from 'express';
import { config as configDotenv } from "dotenv";
import cors from "cors";


import googleRoute from './Routes/Google/googleRoute.js';
import paymentRoute from './Routes/Payments/paymentRoute.js';
import emailRoute from './Routes/Email/emailRoute.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173","https://tataride.web.app","https://tataride.web.app/place-order"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(googleRoute);
app.use(paymentRoute);
app.use(emailRoute);

app.get('/', (req, res) => {
  res.send('Server is Running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
