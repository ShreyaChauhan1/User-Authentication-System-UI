"use client";
import { useState } from "react";
import RegistrationForm from "./RegistrationForm"
import LoginForm from "./LoginForm";
import ResetPassword from "./ResetPassword";

export default function Header() {


    const [isRegistered, setRegistered] = useState(true);


    function onSuccess() {

    }

    return (<div>
        <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem'
        }}>{
                isRegistered ? "Login Form" : "Registration Form"
            }</h1>


        {
            isRegistered &&
            <LoginForm />
        }
        {
            !isRegistered &&
            <RegistrationForm onRegistration={setRegistered} />
        }


    </div>);
}