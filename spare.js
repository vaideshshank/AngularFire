/*var spare=(x,y)=>{
    return new Promise((resolve,reject)=>{
    
            if(typeof x==='number' && typeof y==='number'){
                resolve(x+y);
            }else{     
                reject(`Invalid arguments : ${typeof x} and ${typeof x}`);
            }

    })
}

spare('4',9)
.then(function(ans){
    console.log('Answer : ',ans);
    return spare(ans,64);
},function(err){
    console.log(err);
})
.then(function(ans){
    console.log('Answer : ',ans);
    return spare(ans,46);
},function(err){
    console.log(err);
})
.then(function(ans){
    console.log('Answer : ',ans);
},function(err){
    console.log(err);
})*/

x="ncelkr";
console.log(x.charAt(0).toUpperCase()+x.slice(1));