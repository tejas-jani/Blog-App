import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import 'dotenv/config'

import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10); 
const jwtSalt = process.env.JWT_SALT; 

export const isLogedIn = (req, res, next) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSalt, {}, (err, info) => {
        if (err)
            res.status(401).json({ "err": "Please Login First" })
        else {
            req.info = info;
        }
        next();
    })
}
export const profile = (req, res) => {
    res.json(req.info);
}

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password))
            req.res.status(422).json({ err: "please provide username and password" })
         const user = await User.findOne({ username })
         if (user)
         return req.res.status(400).json({ err: "User name already exists" })
        const userinfo = await User.create({
            username,
            "password": bcrypt.hashSync(password, salt)

        });
        res.json({ message: "user registered" });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ "err": "Something is wrong Registration failed..." });
    }

}


export const login = async (req, res) => {
 
    const { username, password } = req.body;
    if (!(username && password))
        req.res.status(422).json({ err: "please provide username and password" })

    try {
        const userDoc = await User.findOne({ username })

        if (!userDoc)
            return req.res.status(400).json({ err: "User does not exists" })
        const passOk = bcrypt.compareSync(password, userDoc.password)
        // constatnt time comparision function used ro compare two string

        if (!passOk)
            return res.status(401).json({ error: "Email and password do not match" })
        //setup jwt token 
        jwt.sign({ "username": userDoc?.username, "id": userDoc._id }, jwtSalt, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({ "username": userDoc?.username, "id": userDoc._id })
        });


    } catch (err) {
        res.status(500).json({ err: "Internal Server Error" })
    }

}


export const logout = (req, res) => {
    res.clearCookie("token").json({ message: "signout" });
}



// lenth of the has_password is 60
// and 0 to hash.length-31 character is salt  (means first 29  character )
// constatnt time comparision function used ro compare tow stereing