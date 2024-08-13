const inputbox = document.getElementById('input')

const container = document.getElementById('container')
inputbox.onclick=()=>{
    
    err.innerHTML=""
}
console.log()
//counting taske
let count=getCount();
if (!localStorage.getItem("count")) {
    day1();
    localStorage.setItem('new', "yes");
    localStorage.setItem("count",0);
}
function day1(){
    let intro=document.getElementById("day1");
    intro.innerHTML=`<img src="./src/welcome.png" alt="">
        <p>
        This app is designed to help you stay on top of your daily tasks and build a strong streak of consistency. By checking off your tasks each day, you’ll see your streak grow, motivating you to stay committed and organized.
        
        <h3>Why Maintain a Streak?</h3>
        <h3>Boost Motivation:</h3> Seeing your streak grow each day keeps you motivated and reminds you of your progress.
        Build Good Habits: Consistent task completion helps in forming productive habits and achieving your goals.
        Stay Accountable: A daily check-in ensures you’re staying on track and helps you manage your time effectively.
        
        How It Works:
        <h3>Add Tasks:</h3> Enter your tasks for the day and keep track of what needs to be done.
        Check Off Tasks: Mark tasks as complete as you go. Each completed task contributes to your streak.
        Monitor Your Streak: Keep an eye on your streak count and work towards maintaining it every day.

        <h3>Challenge:</h3>
        Complete your tasks every day and watch your streak grow! The more consistent you are, the more productive you’ll become. Can you keep up the streak and push your productivity to new heights? Click "Agree" to start your journey and accept the challenge. Let’s make every day count!
    </p>
            <button id="agree">Agree</button>`

            
        intro.style.display = 'block';
let agree = document.getElementById("agree")
agree.onclick=()=>{
    intro.innerHTML='';
    
    intro.style.display = 'none';
}
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
   
    
    localStorage.setItem('new', "old");
if(inputbox.value===''){
err.innerHTML="<p> Enter a task before hitting Add!</p>"


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
document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            add(); // Replace with the function you want to call
        }
    });
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

//cal
document.getElementById('cal-img').addEventListener('click', function() {
    toggleDate();
});

let showing = false;

function toggleDate() {
    const dateElement = document.getElementById('date');
    
    if (!showing) {
        showDateLetterByLetter(dateElement);
    } else {
        removeDateLetterByLetter(dateElement);
    }
    
    showing = !showing;
}

function showDateLetterByLetter(element) {
    const today = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options).replace(',', '');
    
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (index < formattedDate.length) {
            element.textContent += formattedDate[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 100); // Adjust the speed as needed
}
function removeDateLetterByLetter(element) {
    const text = element.textContent;
    let index = text.length;

    const interval = setInterval(() => {
        if (index > 0) {
            element.textContent = text.slice(0, --index);
        } else {
            clearInterval(interval);
        }
    }, 100); // Adjust the speed as needed
}




    // function mockDate(isoDateString) {
    //     const mockDate = new Date(isoDateString);
    
    //     window.Date = class extends Date {
    //         constructor(...args) {
    //             if (args.length) {
    //                 return new Date(...args);
    //             }
    //             return mockDate;
    //         }
    
    //         static now() {
    //             return mockDate.getTime();
    //         } 
    //     }; performDailyCheck();
    // }
    performDailyCheck();
    // Usage example:
    // mockDate('2024-08-16');
   