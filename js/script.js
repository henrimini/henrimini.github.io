const canvas = document.getElementById("animated-bg");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const possibleNotes = ["♩", "♪", "♫", "♬", "♭", "♮", "♯"];
const possibleColors = ["black", "lightblue", "white"];


let particlesArray;
// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80 * (canvas.width/80)),
};

class Note {
    constructor(x, y, directionX, directionY, size, color, text) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.text = text;
    }
    draw(){
        ctx.beginPath();
        ctx.font = this.size + 'px Oxygen';
        ctx.fillText(this.text, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 50);
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        let text = possibleNotes[Math.floor(Math.random() * possibleNotes.length)]

        particlesArray.push(new Note(x, y, directionX, directionY, size, color, text));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i= 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 80 * (canvas.width / 80));
        init();
    }
);

window.addEventListener("mousemove", function (event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;

})

window.addEventListener("click", function() {
    let size = (Math.random() * 50);
    let x = mouse.x;
    let y = mouse.y - document.getElementById("navbar").offsetHeight;
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    let text = possibleNotes[Math.floor(Math.random() * possibleNotes.length)]
    particlesArray.push(new Note(x, y, directionX, directionY, size, color, text));
});

init();
animate();