function add(n1:number,n2 :number):number{
    return n1 + n2
}
function printeResult(num:number){
    console.log('Result: ' + num);
    
}
printeResult((add(5,12)))

let combineValues : (a:number,b:number)=> number;

combineValues=add;
combineValues= printeResult
console.log(combineValues(8,8));
