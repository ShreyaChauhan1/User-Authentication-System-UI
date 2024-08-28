"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let token = ""  // fetch from the url 
    const url = new URL(window.location.href);
    const obj = Object.fromEntries(url.searchParams.entries()); // Convert entries to an object
    for (let [key, value] of Object.entries(obj)) {
        if(key === "token"){
            token = value
        }
    }
    const resetPasswordUrl: string = `http://localhost:9999/api/user/resetPassword?token=${token}&password=${password}`


    function handleUpdatePassword(event: any) {

        if (password !== confirmPassword) {
            toast.error("Password mismatch!");
            return;
        }

        if(!password || !confirmPassword){
            toast.error("Please fill all the fields correctly!");
            return;
            return;
        }

        fetch(resetPasswordUrl)
            .then((res) => res.json())
            .then((res) => {
                toast.success(res.data)
                //navigate to login page 
            })
    }

    return (<>

        <Toaster />
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <label>Enter your password</label>
            <Input value={password} type="password" onChange={e => setPassword(e.target.value)} />

            <label>Confirm your password</label>
            <Input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Button style={{ marginTop: '1rem' }} onClick={e => handleUpdatePassword(e)}>
                    Update Password
                </Button>

            </div>
        </div>

    </>)
}