import { mongoose } from "mongoose";

const { Schema, model } = mongoose;


const UserSchema = Schema({
    username: {
        type: String,
        require: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

 export const User  = model("User",UserSchema);
 
 