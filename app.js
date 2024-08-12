const inputbox = document.getElementById('input')

const container = document.getElementById('container')
inputbox.onclick=()=>{
    
    err.innerHTML=""
}
console.log()
//counting taske
let count=getCount();
if (!localStorage.getItem("count")) {
    localStorage.setItem('new', "yes");
    localStorage.setItem("count",0);
}

function getCount(){
    return parseInt(localStorage.getItem("count"));
}
function updatetask(n){
    localStorage.setItem("count", n);
    count = getCount();
}


let err = document.getElementById("err");
function add(){
if(inputbox.value===''){
err.innerHTML="<p>Did your brain take a vacation? Enter a task before hitting Add!</p>"


}
else{
    let li = document.createElement('li');
    li.innerHTML=inputbox.value;
    container.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML="\u00d7"
    li.appendChild(span)
    count+=1;
    updatetask(count);

}
inputbox.value="";
save();
}

container.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.targer.classList.toggle("checked");
        save();
    }else if(e.target.tagName==="SPAN"){
e.target.parentElement.remove();
count-=1;
updatetask(count);
save();
    }
},false);
container.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        save();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        save();
    }
}, false);
function save(){
    localStorage.setItem('data',container.innerHTML);
    
}
function show(){
    container.innerHTML=localStorage.getItem('data');
}
show();

//streak code logic


function imgUpdate(days) {
    
    localStorage.setItem('new', "old");
    let img = document.getElementById('img');
    if (days > 0) {
        img.src = 'src/20240812_184446.png';
    } else {
        days = 0;
        img.src = 'src/20240812_184806.png';
    }
}

function countUpdate(days){
    let day = document.getElementById("days")
    day.innerHTML = days;
    imgUpdate(days);
    if (days==0){
        missed();
    }

}
function completed() {
    return count;
}

function checkAndUpdateDays() {
    const currentValue = completed();
    let days = parseInt(localStorage.getItem("days"), 10) || 0;
    const lastCheck = localStorage.getItem('lastCheck');
    const yesterday = new Date();

        yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    //becouse if the user skiped a day in between
    if(days>0 && lastCheck!==yesterdayString){
        days = 0;
    }
    if(currentValue== 0){
        days += 1;
    }else{
        days = 0;
    }
    localStorage.setItem("days", days.toString());
    countUpdate(days);
}

function performDailyCheck() {
    const lastCheck = localStorage.getItem('lastCheck');
    const today = new Date().toDateString();

    if (lastCheck !== today) {
        checkAndUpdateDays();
        localStorage.setItem('lastCheck', today);
         
    }
}



onclick=()=>{
    miss.innerHTML=""
    miss.style.display = 'none';
}
//about streak

document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('img');
    const div = document.getElementById('about');
    //lap ku
    img.onmouseover = function() {
        div.innerHTML = `
            <h2>Streak</h2>
            <p>Complete all your tasks daily to build and maintain your streak!</p>
            
        `;
        div.style.display = 'block';
     

    img.onmouseleave = () => {
        div.innerHTML = '';
        div.style.display = 'none'; 
    };
    //phn ku
    img.onmousedown = function() {
        div.innerHTML = `
            <h2>Streak</h2>
            <p>Complete all your tasks daily to build and maintain your streak!</p>
            
        `;
        div.style.display = 'block';
    
    };


}});


    const messages = [
        "Missed a day? I guess keeping a streak isn’t as easy as it sounds. Ready to try again?",
        "A day off, huh? Maybe sticking to a streak is harder than you thought. Give it another shot!",
        "Oops, missed a day! Looks like maintaining a streak is a bigger challenge than expected. You can do it, right?",
        "Skipped a day? Maintaining a streak isn’t as simple as it seems. How about showing some real effort?",
        "Missed a day? Keeping a streak seems tougher than you thought. Time to prove you can stick with it!"
    ];
    
    function missed() {
        if(localStorage.getItem("new")=="old" ){
   
        const randomIndex = Math.floor(Math.random() * 5); // Random number between 0 and 4
        const randomMessage = messages[randomIndex];
        miss.innerHTML = `
            <h2>Streak missed</h2>
            <p>${randomMessage}</p>
        `;
        miss.style.display = 'block';
            }
    }

    
performDailyCheck();