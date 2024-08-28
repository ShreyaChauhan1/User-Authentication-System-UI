"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useRouter } from 'next/navigation'

export default function TabsDemo() {

  const router = useRouter();
  const [tabValue, setTabValue] = useState("login")

  //Registration Logic : 

  const url: string = "http://localhost:9999/api/user/register"
  const verificationUrl: string = "http://localhost:9999/api/user/activate"

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

        if (res.data.includes("User Registered successfully!")) {
          toast.success(res.data);
          setDialogOpened(prev => !prev);
        }
        else {
          toast.error(res.data);
        }
      })
      .catch((err) => console.log('error : ', err));
  }

  function handleOtpValidation(value: any) {
    console.log('value is : ', value)
  }

  function handleComplete() {

  let url  = `${verificationUrl}?email=${email}&activationCode=${Number(inputOtpValue)}`
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data.includes("account activated")) {
          toast.success(res.data);
          setDialogOpened(prev => !prev)
          setTabValue("login")
        }
        else {
          toast.error(res.data)
        }
      })
  }


  //login logic 

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginDialogOpened, setLoginDialogOpened] = useState(false)
  const [recoverEmail, setRecoverEmail] = useState("");

  const loginUrl: string = "http://localhost:9999/api/user/loginUser"
  const forgotUrl: string = `http://localhost:9999/api/user/forgotPassword?email=${recoverEmail}`

  //localhost:9999/api/user/forgotPassword?email=ashishvg1437@gmail.com
  function handleLoginSubmit(event: any) {

    if (!loginEmail || !loginPassword) {
      toast.error("Please fill all the fields correctly!");
      return;
    }
    event.preventDefault();

    fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        if (res.data.includes("Incorrect") || res.data.includes("found") || res.data.includes("not active"))
          toast.error(res.data)
        else {
          toast.success(res.data)
          console.log('redirect')
          router.push('/dashboard')

          

        }
      })
      .catch((err: any) => console.error(err))
  }

  const handleForgotPassword = (e: any) => {
    // fetch()
    setLoginDialogOpened(prev => !prev)
  }

  function handleRecoverPassword(e: any) {

    fetch(forgotUrl)
      .then((res) => res.json())
      .then((res) => {
        toast.success(res.data)
        setLoginDialogOpened(prev => !prev)
      })
  }



  return (<>
    <div style={{ margin: 'auto', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <Toaster />
      <Tabs defaultValue="login" className="w-[400px]" value={tabValue}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setTabValue("login")}>Login</TabsTrigger>
          <TabsTrigger value="register" onClick={() => setTabValue("register")}>Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="vishek@gmail.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input value={loginPassword} type="password" onChange={e => setLoginPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Button style={{ marginTop: '1rem' }} onClick={e => handleLoginSubmit(e)}>
                  Login
                </Button>
                <Button variant="link" style={{ marginTop: '1rem' }} onClick={e => handleForgotPassword(e)}>
                  Forgot password ?
                </Button>

              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register" >
          <Card>
            <CardHeader>
              <CardTitle >Register</CardTitle>
              <CardDescription>
                Enter the fields to register
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Vishek" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Patel" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="vishek@gmail.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input value={password} type="password" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={e => handleSubmit(e)}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>


      {/* OTP Dialog section */}
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

      {/* Forgot Password section */}
      <Dialog open={loginDialogOpened} onOpenChange={setLoginDialogOpened} >
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
