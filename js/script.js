// function change101Top() {
//     let obj = document.querySelector(".hp-101");
//     console.log(obj);
// }
// change101Top();

function makeItRain() {

}

var hpRain = document.querySelector('.hp-rain');

function makeItRain() {
    hpRain.innerHTML = "";
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

    hpRain.innerHTML = drops;
}

// makeItRain();