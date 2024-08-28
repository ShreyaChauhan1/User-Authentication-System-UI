"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function RegistrationForm({ onRegistration }) {
    const url: string = "http://localhost:9999/api/user/register"
    const verificationUrl:string = "http://localhost:9999/api/user/verify"

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false)
    const [inputOtpValue, setInputOtpValue] = useState("");
    function handleSubmit(event: any) {
        event.preventDefault();

        if (firstName && lastName && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                toast.error("Password mismatch!");
                return;
            }
        }
        else {
            toast.error("Please fill all the fields correctly!");
            return;
        }
        fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
            .then((res) => res.json())
            .then((res) => {
                setDialogOpened(prev => !prev);
                toast.success(res.data);
            })
            .catch((err) => console.log('error : ', err));
    }

    function handleOtpValidation(value: any) {
        console.log('value is : ', value)
    }

    function handleComplete() {
        fetch(verificationUrl, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                email,
                activationCode:Number(inputOtpValue)
            })
        })
        .then((res)=> res.json())
        .then((res)=>{
            toast.success(res.data);
            if(res.data.includes("account activated")){
                onRegistration(true);
            }
        })
    }

    return (<>
        <Toaster />
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>Enter your first name</label>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
            <label>Enter your last name</label>
            <Input value={lastName} onChange={e => setLastName(e.target.value)} />
            <label>Enter your email address</label>
            <Input value={email} onChange={e => setEmail(e.target.value)} />
            <label>Enter your password</label>
            <Input value={password} type="password" onChange={e => setPassword(e.target.value)} />
            <label>Confirm your password</label>
            <Input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} />

            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Accept terms and conditions
                </label>
            </div>
            <Button style={{ marginTop: '1rem' }} onClick={e => handleSubmit(e)}>
                Register
            </Button>




            <Dialog open={dialogOpened} onOpenChange={setDialogOpened} >
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Enter the OTP sent to your gmail: </DialogTitle>


                        <div className="space-y-2">
                            <InputOTP
                                maxLength={6}
                                value={inputOtpValue}
                                onChange={(value) => setInputOtpValue(value)}
                                onComplete={handleComplete}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                          
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    </>
    )
}