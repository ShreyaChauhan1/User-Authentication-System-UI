"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from 'next/navigation'
 
export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const token = params.get('token');
        if (token) {
            setToken(token);
        }
    }, []);
    
    const resetPasswordUrl: string = `http://localhost:9999/api/user/resetPassword?token=${token}&password=${password}`


    function handleUpdatePassword(event: any) {

        if (password !== confirmPassword) {
            toast.error("Password mismatch!");
            return;
        }

        if(!password || !confirmPassword){
            toast.error("Please fill all the fields correctly!");
            return;
        }

        fetch(resetPasswordUrl)
            .then((res) => res.json())
            .then((res) => {

                if(!res.data.includes("Password has been successfully reset."))
                toast.error(res.data)
                else
                toast.success(res.data)
                //navigate to login page 
            })
    }

    return (<>

        <Toaster />
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem',margin : 'auto', maxWidth : '500px', marginTop : '2rem',  }}>
            <h1 style={{fontSize:'2rem', fontWeight:'700'}}>Reset your password</h1>
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