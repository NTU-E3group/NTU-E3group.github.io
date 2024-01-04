// document.addEventListener('mousemove', function(e) {
//     const cursor = document.getElementById('custom-cursor');
//     cursor.style.left = e.pageX + 'px';
//     cursor.style.top = e.pageY + 'px';
// });

// document.querySelectorAll('a, button, input, [hoverable]').forEach(elem => {
//     elem.addEventListener('mouseover', function() {
//         document.getElementById('custom-cursor').classList.add('hover-effect');
//     });

//     elem.addEventListener('mouseout', function() {
//         document.getElementById('custom-cursor').classList.remove('hover-effect');
//     });
// });


let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
const delay = 5; // 延遲值，可以根據需求調整

const cursor = document.getElementById('custom-cursor');

function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + (distX / delay);
    cursorY = cursorY + (distY / delay);

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

document.querySelectorAll('a, button, input, [hoverable]').forEach(elem => {
    elem.addEventListener('mouseover', function() {
        cursor.classList.add('hover-effect');
    });

    elem.addEventListener('mouseout', function() {
        cursor.classList.remove('hover-effect');
    });
});

animateCursor();
