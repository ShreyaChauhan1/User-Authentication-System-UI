import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false)
    const [recoverEmail , setRecoverEmail] = useState("");

    const url: string = "http://localhost:9999/api/user/loginUser"
    const forgotUrl: string = `http://localhost:9999/api/user/forgotPassword?email=${recoverEmail}`

    //localhost:9999/api/user/forgotPassword?email=ashishvg1437@gmail.com
    function handleSubmit(event: any) {
        event.preventDefault();

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((res: any) => res.json())
            .then((res: any) => {
                (res.data.includes("Incorrect") || res.data.includes("found")) ?
                    toast.error(res.data) :
                    toast.success(res.data)
            })
            .catch((err: any) => console.error(err))
    }

    const handleForgotPassword = (e: any) => {
        // fetch()
        setDialogOpened(prev => !prev)
    }

    function handleRecoverPassword(e:any){

        fetch(forgotUrl)
        .then((res) => res.json())
        .then((res) => {
            toast.success(res.data)

        })
    }

    return (
        <>

            <Toaster />
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '0.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label>Enter your email address</label>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
                <label>Enter your password</label>
                <Input value={password} type="password" onChange={e => setPassword(e.target.value)} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Button style={{ marginTop: '1rem' }} onClick={e => handleSubmit(e)}>
                        Login
                    </Button>
                    <Button variant="link" style={{ marginTop: '1rem' }} onClick={e => handleForgotPassword(e)}>
                        Forgot password ?
                    </Button>

                </div>
                <Dialog open={dialogOpened} onOpenChange={setDialogOpened} >
                    <DialogContent >
                        <DialogHeader>
                            {/* <DialogTitle>Enter the OTP sent to your gmail: </DialogTitle> */}

                            <label>Enter your email address</label>
                            <Input value={recoverEmail} onChange={e => setRecoverEmail(e.target.value)} />
                            <Button style={{ marginTop: '1rem' }} onClick={e => handleRecoverPassword(e)}>
                                Recover Password
                            </Button>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}