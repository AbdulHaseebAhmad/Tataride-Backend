import { Router } from "express";
import { sendBookingConfirmation } from './controller/emailController.js';

const emailRoute = Router();


emailRoute.post("/api/bookingConfirmation",sendBookingConfirmation)

export default emailRoute;