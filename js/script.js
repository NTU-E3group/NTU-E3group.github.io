// function change101Top() {
//     let obj = document.querySelector(".hp-101");
//     console.log(obj);
// }
// change101Top();

function makeItRain() {

}

var hpRainFront = document.querySelector('.hp-rain-front');
var hpRainBack = document.querySelector('.hp-rain-back');

function makeItRain() {
    hpRainFront.innerHTML = "";
    var increment = -20;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (7 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += `<line x1=${increment + 10}% y1="0" x2=${increment}% y2="540" style="animation-delay: 0.${randoHundo}s;" />`
    }

    hpRainFront.innerHTML = drops;
}

// makeItRain();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function makeItRainBack(rainSlope, precip, dropTime) {
    // dropTime is in milliseconds (1000 - 2000)

    hpRainBack.innerHTML = "";
    var increment = -rainSlope;
    var drops = "";

    var rainIntensity = 100/precip;
    while (increment < 960) {
        var animationDelay = getRandomInt(1, dropTime);
        increment += getRandomInt(10, 10 + rainIntensity);
        var splatX = increment;
        var splatY = getRandomInt(380, 520);
        drops += `<line x1="${splatX + rainSlope}" y1="${splatY - 540}" x2="${splatX}" y2="${splatY}" style="animation-delay: ${animationDelay / 1000}s; animation-duration: ${dropTime / 1000}s"/>`
        drops += `<path d="M${splatX - 10},${splatY}A7,5,0,0,1,${splatX + 10},${splatY}" style="transform-origin: ${splatX}px ${splatY}px; animation-delay: ${animationDelay / 1000}s; animation-duration: ${dropTime / 1000}s"/>`
    }

    hpRainBack.innerHTML = drops;
}

makeItRainBack(200, 10, 1300);
