import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "user doesn't exist"}, {status: 400})
        }

        // check if the password is correct
        console.log(`userPass: ${password}`)

        const validPassword = await bcryptjs.compare(password, user.password)

        console.log(`isValidPass ${validPassword}`)
        if(!validPassword){
            return NextResponse.json({error: "invalid password"}, {status: 400})
        }

        // create Token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        }, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
        
    } catch (error: any) {
        console.log(`Error while login: ${error}`)
        return NextResponse.json({error: error.message}, {status: 500});

    }
}