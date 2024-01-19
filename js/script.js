
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

const colorArray = ['--r-red', '--r-orange', '--r-yellow', '--r-green', '--r-blue', '-r-indigo', '--r-purple'];


// 101 top color change
function change101Top() {
    var timeNow = new Date();
    var utc8Day = timeNow.getUTCHours() >= 16 ? timeNow.getUTCDay() + 1 : timeNow.getUTCDay();
    var topColorHex = getComputedStyle(document.documentElement).getPropertyValue(colorArray[utc8Day % 7]);
    document.querySelector(".fill-101-top").style.fill = topColorHex;
};
change101Top();

var hpDiveIn = document.querySelector('.hp-dive-in');
var hpTopLayer = document.querySelector('.hp-top-layer');

hpTopLayer.addEventListener('mouseover', () => {
    hpDiveIn.style.transform = 'translateY(-0.4375rem)';
});
hpTopLayer.addEventListener('mouseout', () => {
    hpDiveIn.style.transform = 'translateY(0rem)';
});

// rain
var hpRainFront = document.querySelector('.hp-rain-front');
var hpRainBack = document.querySelector('.hp-rain-back');

function makeItRain(ifBack, rainSlope, precip, dropTime) {
    var hpSvgRain = ifBack ? document.querySelector('.hp-rain-back') : document.querySelector('.hp-rain-front');

    // hpSvgRain.innerHTML = "";
    increment = rainSlope < 0 ? 0 : -rainSlope;
    var drops = "";

    var rainIntensity = (ifBack ? 100 : 1000) / precip;
    while (rainSlope < 0 ? increment < 960 + Math.abs(rainSlope) : increment < 1000) {
        var animationDelay = getRandomInt(1, dropTime);
        increment += getRandomInt(10, 10 + rainIntensity);
        var splatX = increment;
        var splatY = getRandomInt(380, 520);
        var secDevide = ifBack ? 1000 : 2000;

        drops += `<line x1="${splatX + rainSlope}" y1="${ifBack ? splatY - 540 : 0}" x2="${splatX}" y2="${ifBack ? splatY : 540}" style="animation-delay: ${animationDelay / secDevide}s; animation-duration: ${dropTime / secDevide}s"/>`
            
        ifBack ? drops += `<path d="M${splatX - 10},${splatY}A7,5,0,0,1,${splatX + 10},${splatY}" style="transform-origin: ${splatX}px ${splatY}px; animation-delay: ${animationDelay / 1000}s; animation-duration: ${dropTime / 1000}s"/>` : null;
    };

    hpSvgRain.innerHTML = drops;
};

// dropTime in milliseconds (1000 - 2000)
var rainSlope = 200;
var precip = 1;
var dropTime = 1300;

makeItRain(true, rainSlope, precip, dropTime);
makeItRain(false, rainSlope, precip, dropTime);



// cursor
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const delay = 4;

const cursor = document.querySelector('.cursor');
const cursorText = document.querySelector('.cursor-text');
// console.log(cursor.style);
// console.log(window.innerWidth);
// console.log(document.documentElement.clientWidth);

function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + (distX / delay);
    cursorY = cursorY + (distY / delay);

    if (cursorX + cursor.offsetWidth/2 >= document.documentElement.clientWidth) {
        cursorX = document.documentElement.clientWidth - cursor.offsetWidth/2;
    };
    

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // console.log(cursor.clientWidth);

    requestAnimationFrame(animateCursor);
}
// const windowWidth = document.documentElement.clientWidth;
// const windowHeight = document.documentElement.clientHeight;

// console.log(windowWidth, windowHeight);

document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});
// document.addEventListener('scroll', function(e) {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
// });



document.querySelectorAll('[hover-text]').forEach(elem => {
    elem.addEventListener('mouseover', function() {
        cursor.classList.add('hover-effect');
        // cursorText.innerHTML = 'fjooj';
        cursorText.innerHTML = elem.getAttribute('hover-text');
    });

    elem.addEventListener('mouseout', function() {
        cursor.classList.remove('hover-effect');
        cursorText.innerHTML = '';
    });
});

// animateCursor();