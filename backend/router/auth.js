import { Router } from 'express';
import { isLogedIn, login, logout, register } from '../controller/auth.js';
import { profile } from '../controller/auth.js';
const router = Router()


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout)
router.get("/profile",isLogedIn,profile);

export const authRoutes=   router; 