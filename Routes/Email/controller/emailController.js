import nodemailer from 'nodemailer';
import { config as configDotenv } from "dotenv";

configDotenv();

export const sendBookingConfirmation = async (req, res) => {
  const { pickup, dropoff, customerName,customerPhone,fare,date,time,note } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',  
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass:process.env.ADMIN_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Booking Confirmation" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_RECIEVE_EMAIL,  
      subject: 'New Booking Confirmed',
      html: `
        <h2>You have a New Booking</h2>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Pickup Location:</strong> ${pickup}</p>
        <p><strong>DropOff Location:</strong> ${dropoff}</p>
        <p><strong>Pickup Time:</strong> ${time}</p>
        <p><strong>Pickup Date:</strong> ${date}</p>
        <p><strong>Pickup Fare:</strong> $ ${fare}</p>
        <p><strong>Drivers Note:</strong>  ${note}</p>

      `,
    });

    res.status(200).json({ message: 'Email sent to admin!' });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};
