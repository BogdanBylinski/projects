import {initializeApp} from 'firebase/app';
import {signInWithEmailAndPassword, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc}from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBleUKCvHdz7na5vJEZOhsSOMZvv_0jTho",
    authDomain: "crwn-clothing-db-b2168.firebaseapp.com",
    projectId: "crwn-clothing-db-b2168",
    storageBucket: "crwn-clothing-db-b2168.appspot.com",
    messagingSenderId: "458105550555",
    appId: "1:458105550555:web:3ae9b73e99a827d2473efe"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: 'select_account',
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () =>signInWithPopup(auth, googleProvider     );
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)


  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={})=>{
      if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)
    
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef
    //if useer data not exists
    //create user data

    //if useer data exists
    

    // return userDocRef
  }
  export const createAuthUserWithEmailAndPassword  = async (email, password)=>{
      if(!email || !password) return;

      return await createUserWithEmailAndPassword (auth, email, password)
  }
  export const signInAuthUserWithEmailAndPassword  = async (email, password)=>{
      if(!email || !password) return;

      return await signInWithEmailAndPassword (auth, email, password)
  }
