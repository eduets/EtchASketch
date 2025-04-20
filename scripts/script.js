/* Etch-a-Sketch script */

const INITIAL_GRID_UNITS = 16;
const MAX_GRID_UNITS = 100;
const OPACITY_DECREASE = 0.1;
const containerElement = document.querySelector("#container");
const generateGridButton = document.querySelector("#generate-grid-button");

function removeGrid() {
    const squareElements = containerElement.children;
    for (let i=squareElements.length-1; i>=0; i--) {
        containerElement.removeChild(squareElements[i]);
    }
}

function generateGrid(gridUnits) {
    const squaresAmount = gridUnits * gridUnits;
    for (let i=0; i<squaresAmount; i++) {
        const newSquare = document.createElement("div");
        const sizePercentage = 100 / gridUnits;
        newSquare.style.flexBasis = `${sizePercentage}%`;
        containerElement.appendChild(newSquare);
    }
}

function isNaturalNumber(number) {
    isNatural = true;
    if (!Number.isInteger(number)) {
        isNatural = false;
    } else if (number < 0) {
        isNatural = false;
    }
    return isNatural;
}

const generateGridClick = (event) => {
    let newGridUnits = prompt(`Enter new number of squares per side for the new grid (${MAX_GRID_UNITS} max)`);
    if (newGridUnits === null) {
        return;
    }

    newGridUnits = Number(newGridUnits);
    if (isNaturalNumber(newGridUnits)) {
        if (newGridUnits > MAX_GRID_UNITS) {
            newGridUnits = MAX_GRID_UNITS;
        }
    } else {
        newGridUnits = 0;
    }
    if (newGridUnits === 0) {
        containerElement.classList.remove("black-background");
        containerElement.classList.add("white-background");
    } else {
        containerElement.classList.remove("white-background");
        containerElement.classList.add("black-background");
    }
    removeGrid();
    generateGrid(newGridUnits);
};
generateGridButton.addEventListener("click", generateGridClick);

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var randomColor = "rgb(" + r + "," + g + "," + b + ")";  
    return randomColor;
}

const gridHover = (event) => {
    if (event.target.getAttribute("id") !== "container"){
        event.target.style.backgroundColor = getRandomColor();
        let opacity = event.target.style.opacity;
        if (opacity === "") {
            opacity = "1";
        }
        if (opacity > 0) {
            opacity -= OPACITY_DECREASE;
            if (opacity < 0) {
                opacity = 0;
            }
        }
        event.target.style.opacity = opacity;
    }
};
containerElement.addEventListener("mouseenter", gridHover, {capture: true});

generateGrid(INITIAL_GRID_UNITS);