const body = document.querySelector('body');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

const colorArray = ['--r-red', '--r-orange', '--r-yellow', '--r-green', '--r-blue', '--r-indigo', '--r-purple'];

// 101 top color change
function change101Top() {
    var timeNow = new Date();
    var utc8Day = timeNow.getUTCHours() >= 16 ? timeNow.getUTCDay() + 1 : timeNow.getUTCDay();
    var topColorHex = getComputedStyle(document.documentElement).getPropertyValue(colorArray[utc8Day % 7]);
    document.querySelector(".hp-101-top").style.fill = topColorHex;
};
change101Top();

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

// makeItRain(true, rainSlope, precip, dropTime);
// makeItRain(false, rainSlope, precip, dropTime);

// filters
document.querySelectorAll('.filter').forEach((filter) => {
    let where = filter.getAttribute('where');

    document.querySelectorAll(`.filter-checkbox[where="${where}"]`).forEach((checkbox) => {
        document.querySelectorAll(`.filter-content[where="${where}"]`).forEach((elem) => {
            if (elem.dataset.value === checkbox.value) {
                elem.style.display = checkbox.checked ? 'grid' : 'none';
            };
        });

        checkbox.addEventListener('change', () => {
            document.querySelectorAll(`.filter-content[where="${where}"]`).forEach((elem) => {
                if (elem.dataset.value === checkbox.value) {
                    elem.style.display = checkbox.checked ? 'grid' : 'none';
                };
            });
        });
    });
});


// research animation: hover to start
const resImgBlockWithAni = Array.from(document.querySelectorAll('.res-img-block'))
    .filter(elem => elem.querySelector('animateMotion'));

resImgBlockWithAni.forEach(elem => {
    const aniTopLayer = document.createElement('div');
    elem.insertBefore(aniTopLayer, elem.firstChild);
    aniTopLayer.setAttribute('class', 'ani-top-layer');

    aniTopLayer.addEventListener('mouseover', () => {
        elem.querySelectorAll('animateMotion').forEach(svgElem => {
            svgElem.beginElement();
        });
    });
    aniTopLayer.addEventListener('mouseout', () => {
        elem.querySelectorAll('animateMotion').forEach(svgElem => {
            svgElem.endElement();
        });
    });
});


// group life
// const element = document.querySelector('div.a');
// const computedStyle = getComputedStyle(element);
// const width = computedStyle.getPropertyValue('--_width');

// var sliderGap = getComputedStyle(document.querySelector('.glf-section[which="slider"]')).getPropertyValue('--_slider-gap');
// console.log(sliderGap);

// var glfSlider = document.querySelector('.glf-slider');
var glfSliderCurrentNum = document.querySelector('.glf-slider-current-num');
var glfSliderTotalNum = document.querySelector('.glf-slider-total-num');
var glfSliderWrapper = document.querySelector('.glf-slider-wrapper');
var glfSliderBlock = document.querySelectorAll('.glf-slider-block');
var glfSliderBlockNum = document.querySelectorAll('.glf-slider-block').length;
var blockNumMax = glfSliderBlockNum - 1;

glfSliderBlock.forEach((elem, index) => {
    elem.style.setProperty('--_block-num', index);
    if (index === 0) {
        // elem.style.setProperty('display', 'block');
    } else {
        // elem.style.setProperty('display', 'none');
    };
});

// glfSliderBlock[0].style.setProperty('display', 'block');

glfSliderWrapper.style.setProperty('--_slide-to', 0);
glfSliderCurrentNum.innerHTML = 1;
glfSliderTotalNum.innerHTML = glfSliderBlockNum;

var glfSliderTo = 0;
function glfSliderPush(push) {
    glfSliderBlock[glfSliderTo].style.setProperty('opacity', 0);

    glfSliderTo += push;
    glfSliderTo = glfSliderTo < 0 ? 0 : glfSliderTo;
    glfSliderTo = glfSliderTo > blockNumMax ? blockNumMax : glfSliderTo;
    glfSliderWrapper.style.setProperty('--_slide-to', glfSliderTo);

    glfSliderCurrentNum.innerHTML = glfSliderTo + 1;

    glfSliderBlock[glfSliderTo].style.setProperty('opacity', 1);

}

// menu
var menu = document.querySelector('.menu');
var menuBtn = document.querySelector('.menu-btn');
var menuCloseBtn = document.querySelector('.menu-close-btn');
var menuBg = document.querySelector('.menu-bg');
var menuA = document.querySelectorAll('.menu-a');

function getScrollBarWidth() {
    let el = document.createElement("div");
    el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
    document.body.appendChild(el);
    let width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
}

function menuOpen() {
    body.style.paddingInlineEnd = getScrollBarWidth() + 'px';
    body.classList.add('overflow-hidden');
    menu.classList.remove('display-none');
    setTimeout(() => {
        menu.classList.add('menu-active');
    }, 10);
};

function menuClose() {
    body.style.paddingInlineEnd = 0;
    body.classList.remove('overflow-hidden');
    menu.classList.remove('menu-active');
    setTimeout(() => {
        menu.classList.add('display-none');
    }, 300);
};

// the bg part to be fixed
[menuBtn, menuCloseBtn, menuBg].forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (menu.classList.contains('menu-active')) {
            menuClose();
        } else {
            menuOpen();
        };
    });
});

menuA.forEach(elem => {
    elem.addEventListener('click', () => {
        menuClose();
    });
});


document.addEventListener('click', (e) => {
    console.log(e.target);
});

// to top button
var toTopBtn = document.querySelector('.to-top-btn');

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        toTopBtn.style.display = "grid";
        setTimeout(() => {
            toTopBtn.style.opacity = "1";
        }, 10);
    } else {
      toTopBtn.style.opacity = "0";
        setTimeout(() => {
            toTopBtn.style.display = "none";
        }, 300);
    }
  }

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



// document.querySelectorAll('[hover-text]').forEach(elem => {
//     elem.addEventListener('mouseover', function() {
//         cursor.classList.add('hover-effect');
//         // cursorText.innerHTML = 'fjooj';
//         cursorText.innerHTML = elem.getAttribute('hover-text');
//     });

//     elem.addEventListener('mouseout', function() {
//         cursor.classList.remove('hover-effect');
//         cursorText.innerHTML = '';
//     });
// });

// animateCursor();