console.log("Hello");

const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}


// user konsi key press kr rha hai to yeh pata krne k liye
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    console.log(keys);
}

let player = { speed: 5 };
startScreen.addEventListener('click', start);

function start() {
    player.start = true;
    window.requestAnimationFrame(gamePlay);

    for (let x = 0; x < 6; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);

    }

    gameArea.classList.remove('hide');
    startScreen.classList.add('hide');

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    // arrow ki madad se car ko move krna hai

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);

    for (let x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1)*350)*-1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.background = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);

    }
}


function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {

        if (item.y >= 700) {     // car jaise hi aage badhegi lines apne aap aate jaayegi
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {

        if (item.y >= 700) {     // car jaise hi aage badhegi lines apne aap aate jaayegi
            item.y -= 750;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function gamePlay() {
    console.log("Hey I am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect(); // position bata rha hai gameArea ki (x,y,top,bottom,left,right)

    if (player.start) {

        moveLines();
        moveEnemy();
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
    }
}

