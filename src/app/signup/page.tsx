"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {axios} from 'axios';

export default function SignupPage (){
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onSignup = async ()=>{

    }

    useEffect(()=>{
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Signup</h1>
            <hr />

            <label htmlFor="username">username</label>
            <input 
            className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
             id='username'
             type="text" 
             value={user.username} 
             onChange={(e) => setUser({...user, username: e.target.value})} 
             placeholder="username" 
            />

            <label htmlFor="email">email</label>
            <input 
            className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
             id='email'
             type="text" 
             value={user.email} 
             onChange={(e) => setUser({...user, email: e.target.value})} 
             placeholder="email" 
            />

            <label htmlFor="password">password</label>
            <input 
            className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black" 
             id='password'
             type="password" 
             value={user.password} 
             onChange={(e) => setUser({...user, password: e.target.value})} 
             placeholder="password" 
            />
            
            <button
            onClick={onSignup}
            className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600">{buttonDisabled ? "no signup" : "signup"}</button>
            <Link href='/login'>vist login page</Link>
        </div>
    )
}