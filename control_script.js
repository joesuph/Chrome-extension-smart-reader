chrome.tabs.executeScript({file: 'content_script.js'});

document.addEventListener('DOMContentLoaded', function() {
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');

    // onClick's logic below:
    start.addEventListener('click', function() {
        chrome.tabs.executeScript( null, {code:"speakList(getSimilarToSelected());"})
    });
    stop.addEventListener('click', function() {
        chrome.tabs.executeScript( null, {code:"speechSynthesis.cancel()"})
    });
});
