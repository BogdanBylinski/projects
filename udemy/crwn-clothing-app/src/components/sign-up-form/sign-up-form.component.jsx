import {  useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'


const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}
const SignUpForm = ()=>{
    const [formFields, setFormFields]= useState(defaultFormFields)
    const {displayName, email, password, confirmPassword}= formFields;
    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const handleChange = (event)=>{
        const {name, value}= event.target;

        setFormFields({...formFields, [name] : value})

    };
    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert('password do not match')
            return;
        }
        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();


        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create userm email already in use')
            }
            if(error.code === 'auth/weak-password'){
                alert('Password should be at least 6 characters')
            }
            else{

                console.log('user creation encountered an error',error);
            }

        }
 
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label="Display name" type="text" value={displayName} onChange={handleChange} name="displayName" required/>
                <FormInput label="Email" type="email" value={email} onChange={handleChange} name="email" required/>
                <FormInput label="Password"type="password"  value={password} name="password" onChange={handleChange} required/>
                <FormInput label="Confirm Password" type="password" value={confirmPassword} name="confirmPassword" onChange={handleChange} required/>
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}
export default  SignUpForm;