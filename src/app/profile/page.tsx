"use client";

import axios from "axios";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data";

export default function profilePage (){
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () =>{
        try {
            const response =  await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(`error: ${error}`);
            toast.error(error.message)
        }
    }
    const getUserDetails = async ()=>{
        console.log(`on getUserDetails`)
        const res = await axios.get("./api/users/me");
        setData(res)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <h2 className="p-3 rounded bg-green-500">
                {data === "nothing" ? "nothing": <Link href={`/profile/${data}`}>{data}
                     </Link>}
            </h2>
            <hr />
            <p>Profile page</p>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
            <button onClick={getUserDetails} className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            getUserDetails
        </button>
        </div>
    )
}