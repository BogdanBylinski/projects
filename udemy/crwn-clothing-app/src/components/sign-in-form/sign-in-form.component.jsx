/* eslint-disable no-unused-vars */
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
// import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss'




const defaultFormFields={
    email:'',
    password:'',
}
const SignInForm = ()=>{
    const currentUser = useSelector((selectCurrentUser));
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formFields, setFormFields]= useState(defaultFormFields)
    const { email, password, }= formFields;

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const handleChange = (event)=>{
        const {name, value}= event.target;

        setFormFields({...formFields, [name] : value})

    };
    const handleSubmit = async (event)=>{
        event.preventDefault();

        
        try{
            dispatch(emailSignInStart(email, password))
            resetFormFields();


        }
        catch(error){
           console.log(error);
           switch(error.code){
               case 'auth/wrong-password':
                   alert('incorect password for email');
                   break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                console.log(error);
           }
          
        }
 
    }
    const signIngWithGoogle = async () =>{


        

     dispatch(googleSignInStart())
    }
    if(currentUser){
        navigate('/shop')
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an anccount?</h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" value={email} onChange={handleChange} name="email" required/>
                <FormInput label="Password"type="password"  value={password} name="password" onChange={handleChange} required/>
                <div className="buttons-container">

                <Button type="submit">Sign in</Button>
                <Button  type='button' buttonType='google' onClick={signIngWithGoogle} >Google sign in</Button>
                </div>
            </form>
        </div>
    )
}
export default  SignInForm;