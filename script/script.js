
let level = 1;
let levelColor = {}
let goldpoint = "0,0";
let timer = 15;
let timerStarted = false;
let gameOver = false;
let mistake = 0;
let helpCount = 0;

const elementTimer = document.getElementById('timer');
const elementHelp = document.getElementById('help');
const elementScore = document.getElementById('score');
const elementMistake = document.getElementById('mistake');
const finalResult = document.getElementById('overlayResult');
const score_result = document.getElementById('score-result');
const mistake_result = document.getElementById('mistake-result');
const result_image = document.getElementById('result-image');
const result_name = document.getElementById('result-name');
const result_info = document.getElementById('result-info');
const newGame = document.getElementById('newGame');
const share = document.getElementById('share');



let generateCellColor = (cell, i, j) => {
    if(goldpoint === `${i} , ${j}`) {
        cell.style.backgroundColor = levelColor.goldColor;
        return true;
    } else {
        cell.style.backgroundColor = levelColor.color;
        return false;
    }
}

const generateRandNumber = (range) => {
    return Math.floor(Math.random() * range);
}

function generateWidth () {
    if(level === 1){ 
        return 2; 
    } else { 
        const result = (level/3)+2;
        if (result > 7) {
            return 7;
        } else {
            return result;
        }
    } 
}

const levelUp = () => { 
    if(gameOver) {
         return 
    }
    if(!timerStarted) {
        setupTime();
        timerStarted = true;
    } else {
        timer += 3;
    }
    level++;
    elementScore.innerText = level + "";
    generateLevelColor();
    generateGride(generateWidth(), true)
}

const generateGride = (width, initialGoldPoint) => {
    const container = document.getElementsByClassName("gridContainer")[0];
    container.innerText = "";

    if(initialGoldPoint){
        goldpoint = `${generateRandNumber(width)} , ${generateRandNumber(width)}`
    }

    for(let i=0; i< width; i++) {
        const row = document.createElement("div");
        row.classList.add("gridRow");
        container.appendChild(row)

        for(let j=0; j<width; j++) {
            const cell = document.createElement("div");
            cell.classList.add("gridCell");
            const is_goldCell = generateCellColor(cell, i, j)
            if(is_goldCell){
                cell.onclick = levelUp;
            } else {
                cell.onclick = () => {
                    console.log('mistake');
                    timer -= 2;
                    mistake ++;
                    elementMistake.innerText = mistake + "";
                };
            }
            row.appendChild(cell)
        }
    }
}

const generateDiffColor = () => {
    if (level < 5) {
        return 30 - (level * 2);
    } else {
        return 30 - (level * 1.5)
    }
}

const generateLevelColor = () => {
    const tolerance = generateDiffColor();
    const R = generateRandNumber(255);
    const G = generateRandNumber(255);
    const B = generateRandNumber(255);
    const color = `rgb(${R},${G},${B})`;
    const goldColor = `rgba(${R-tolerance}, ${G+tolerance} ,${B+tolerance})`
    levelColor.color = color;
    levelColor.goldColor = goldColor;
}

const rgbaToArray = (rgb) => {
    rgb = rgb.replace("rgb(" , "").replace(")" , "");
    return rgb.split(",");
}

const updateLevelColor = () => {
    const rgb = rgbaToArray(levelColor.color);
    const R = rgb[0];
    const G = rgb[1];
    const B = rgb[2];
    const color = `rgb(${parseInt(R)}, ${parseInt(G)}, ${parseInt(B)})`;
    const goldColor = `rgb(${parseInt(R) - 25},${parseInt(G) + 25},${parseInt(B) + 25})`;
    levelColor.color = color;
    levelColor.goldColor = goldColor;
}

function finishGame() {
    let result;
    for(let i=0; i<levels.length; i++) {
        if(level < levels[i].range) {
            result = levels[i];
            break;
        }
    }
    finalResult.style.transform = "translateY(0)";
    gameOver = true;
    timerStarted = false;
    initializeResult(result)
}


const setupTime = () => {
    const intervalId = setInterval(() => {
        timer -= 0.1;
        if(timer < 0) {
            finishGame();
            return clearInterval(intervalId);
        }
        elementTimer.innerText = Math.floor(timer * 10)/10 + "";
    }, 100);
}

function initializeResult (result) {
    score_result.innerText = level;
    mistake_result.innerText = mistake;
    result_image.src = result.imgLink;
    result_name.innerText = result.name;
    result_info.innerText = result.dec;
}


generateLevelColor()
generateGride(2, true)


elementHelp.onclick = () => {
    if (gameOver || !timerStarted) {
        return
    } else {
        timer -= 7;
        helpCount ++;
    }
    updateLevelColor();
    generateGride(generateWidth(), false);
}

newGame.onclick = () => {
    finalResult.style.transform = "translateY(200%)";
    level = 1;
    timer= 15;
    generateLevelColor();
    generateGride(generateWidth(), true)
    elementScore.innerText = 0;
    elementMistake.innerText = 0;
    elementTimer.innerText = 15;
    gameOver = false;
}

share.onclick = () => {
    window.location.assign(`https://t.me/share/url?url={http://siramon.ir}&text={" امتیاز من در سنجش چشم"}`)
}