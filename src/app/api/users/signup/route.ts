import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // check if user already exists

        let user = await User.findOne({email: email});
        if(user){
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }

        // hash passwrod

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create User

        const newUser = new User({
            username,
            email,
            password
        })
        const savedUser = newUser.save();

        return NextResponse.json({
            message: "user created successfully",
            success: true,
            savedUser},
            { status: 201})
    }catch(error){

    }
}