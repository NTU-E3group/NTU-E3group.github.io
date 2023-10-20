// function change101Top() {
//     let obj = document.querySelector(".hp-101");
//     console.log(obj);
// }
// change101Top();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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
    }

    hpSvgRain.innerHTML = drops;
}


// dropTime in milliseconds (1000 - 2000)

var rainSlope = 200;
var precip = 1;
var dropTime = 1300;

makeItRain(true, rainSlope, precip, dropTime);
makeItRain(false, rainSlope, precip, dropTime);