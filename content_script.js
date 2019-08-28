var tweets = document.getElementsByClassName('tweet-text');
var names = document.querySelectorAll('.FullNameGroup');
var index = 0;
var started = false;

var u = new SpeechSynthesisUtterance();
u.lang = 'en-US';
u.rate = 1.2;
document.body.onmouseup = ()=>{
    if(!started){
        started = true;
        startSpeech();
    }
}

u.onend = function(event) { 
    if(++index<tweets.length)   
        startSpeech();
}

function startSpeech()
{
    u.text = names[index].innerText.substr(0,names[index].innerText.length-4) + " Said " + tweets[index].innerText; 
    speechSynthesis.speak(u);
}