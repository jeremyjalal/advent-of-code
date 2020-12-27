const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

class Coordinates {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const santaCoordinates = new Coordinates(0, 0);
const santaRobotCoordinates = new Coordinates(0, 0);
const visitedHomesCoordinates = [new Coordinates(0, 0)];

const move = (coordinates, char) =>  {
    if(char === '>') {
        coordinates.x++;
    } else if(char === '<') {
        coordinates.x--;
    } else if(char === '^') {
        coordinates.y++;
    } else if(char === 'v') {
        coordinates.y--;
    }
};

const addVisitedHouse = (currentCoordinates) => {
    const alreadyVisitedHouse = visitedHomesCoordinates.filter(coord => coord.x === currentCoordinates.x && coord.y === currentCoordinates.y);
    if(alreadyVisitedHouse.length === 0) {
        visitedHomesCoordinates.push(new Coordinates(currentCoordinates.x, currentCoordinates.y));
    }
};

for(let pos = 0; pos < input.length; pos++) {
    let char = input.charAt(pos);
    const currentCoordinates = (pos % 2 === 0) ? santaCoordinates : santaRobotCoordinates;
    move(currentCoordinates, char);
    addVisitedHouse(currentCoordinates);
}
console.log(visitedHomesCoordinates.length);