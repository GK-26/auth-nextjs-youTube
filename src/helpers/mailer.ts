import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { verify } from "crypto";

export const sendEmail = async ({email, emailType, userId} : any) =>{
    try {
        // created a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 2400000})
                
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 2400000})
                
        }

        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "e7df332817c1ea",
                  pass: "47bf3b1fc1baf4"
                }
              
        })

        const mailOptions = {
            from: "gk@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click 
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
             to ${emailType === "VERIFY" ? "Verify your email" : "reset you password"}
            </p>   <p>"${process.env.DOMAIN}/verifyemail?token=${hashedToken}"</p>`
            
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}