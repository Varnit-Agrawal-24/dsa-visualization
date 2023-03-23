let input=document.querySelector('#n');
let step=document.querySelector('#step');
let boxContainer=document.querySelector(".box-container");
let submit=document.querySelector("#submit");
let reset=document.querySelector("#reset");

if(input.value.length==0){
        submit.disabled=true;
        reset.disabled=true;
    }

input.addEventListener("keyup",()=>{
    if(input.value.length==0){
        submit.disabled=true;
    }
    else{
        submit.disabled=false;
    }
});

submit.addEventListener("click",()=>{

    let n= Number(input.value);
    
    for(let i=1;i<n+1;i++){
        boxContainer.innerHTML += divBox(i);
    }
    submit.disabled=true;
    sieveOfEratosthenes(n);
});

reset.addEventListener("click",async ()=>{
    input.value="";
    boxContainer.innerHTML="";
    step.value="";
    reset.disabled=true;
});

function divBox(num){
    return `
    <div class="box">${num}</div>
    `;
}

async function sieveOfEratosthenes(num){
    let boxes=document.querySelectorAll(".box");
    await sleep(1000);
    step.value="1 is not a prime number";
    await sleep(500);
    boxes[0].classList.add("false");
    await sleep(800);
    for(let i=2;i<=num;i++){
        if(!boxes[i-1].classList.contains("false")){
            step.value=`${i} is a prime number`;
            await sleep(500);
            boxes[i-1].classList.add("true");
            await sleep(1000);
            for(let j=i*i;j<=num;j+=i){
                step.value=`multiple of ${i} is not a prime number`;
                await sleep(500);
                boxes[j-1].classList.add("false")
            }
        }
        else{
            step.value=`${i} is a not prime number`;
            await sleep(800);
        }
    }
    await sleep(1000);
    step.value="Answer";
    reset.disabled=false;
    
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }