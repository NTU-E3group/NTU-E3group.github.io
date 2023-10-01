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

function makeItRainBack(rainSlope) {
    hpRainBack.innerHTML = "";
    var increment = -20;
    var drops = "";

    while (increment < 960) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (100 - 20 + 1) + 20));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        drops += `<line x1="${increment + rainSlope}" y1="0" x2="${increment}" y2="540" style="animation-delay: 0.${randoHundo}s;"/><circle cx="${increment}" cy="540" r="10" style="animation-delay: 0.${randoHundo}s;"/>`
    }

    hpRainBack.innerHTML = drops;
}

makeItRainBack(100);