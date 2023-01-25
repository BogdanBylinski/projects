let userInput: unknown;
let userName : string;
userInput=5
userInput= 'Max';



if(typeof userInput==='string'){

    userName=userInput
}

function generateError(message:string, code : number):never{ //never return anything
    throw{message: message, errorCode:code}
}
generateError('An error occured', 500)