import { createContext,  useEffect, useReducer} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

})


//useReducer

export const USER_ACTION_TYPES = {
    'SET_CURRENT_USER': 'SET_CURRENT_USER',
}


const userReducer = (state, action) => {
    console.log('dispatch')
    console.log(action);
    const { type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                currentUser: payload
            }
        // case 'increment':
        //     return {
        //         value: state.value + 1
        //     }
        default: 
            throw new Error(`Unhandled type ${type} in userReducer`)
    }

}


const INITIAL_STATE = {
    cuurentUser: null
}

export const UserProvider =({children})=>{
    // const [currentUser, setCurrentUser] = useState(null);
    const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) =>{

        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,  user));
    }

    const value = {currentUser, setCurrentUser};


    useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user ) => {
        setCurrentUser(user);
        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
    })
        return unsubscribe
    },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}

/*

const userReducer = (state, action) => {
    return {
        currentUser: 
    }
}
*/