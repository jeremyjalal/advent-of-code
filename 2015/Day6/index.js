const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines = input.split(/\r\n|\n/);

class Instruction {
    action;
    fromX;
    fromY;
    toX;
    toY;
    constructor(action, fromX, fromY, toX, toY) {
        this.action = action;
        this.fromX = fromX|0;
        this.fromY = fromY|0;
        this.toX = toX|0;
        this.toY = toY|0;
    }
}

class Grid {
    lights;
    constructor() {
        this.lights = new Array(1000);
        for(let i = 0; i < 1000; i++)  {
            this.lights[i]  = new Array(1000);
        }
    }
}

const lineRegexp = new RegExp(/^(turn on|turn off|toggle)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)$/);

const parseLine = (line) => {
    const lineData = line.match(lineRegexp);
    return new Instruction(lineData[1], lineData[2], lineData[3], lineData[4], lineData[5]);
}

const doAction = (action, cell) => {
    switch(action) {
        case 'turn on':
            cell = true;
            break;
        case 'turn off':
            cell = false;
            break;
        case 'toggle':
            cell = !!! cell;
            break;
    }
    return cell;
}

const grid = new Grid();

lines.forEach(line => {
    const instruction = parseLine(line);

    const xStart = Math.min(instruction.toX, instruction.fromX);
    const yStart = Math.min(instruction.toY, instruction.fromY);
    const xEnd = Math.max(instruction.toX, instruction.fromX);
    const yEnd = Math.max(instruction.toY, instruction.fromY);
    
    for(let i = xStart; i <= xEnd; i++) {
        const column = grid.lights[i];
        for(let j = yStart; j <= yEnd; j++) {
            column[j] = doAction(instruction.action, column[j]);
        }
    }
});
let bulbsLit = 0;

grid.lights.forEach(lightCol => {
    lightCol.forEach(bulb => {
        if(bulb) {
            bulbsLit++;
        }
    });
});

console.log('Part 1 : ' + bulbsLit);

// Part 2
const doActionPart2 = (action, cell) => {
    if(!cell) {
        cell = 0;
    }
    switch(action) {
        case 'turn on':
            cell++;
            break;
        case 'turn off':
            cell = Math.max(--cell, 0);
            break;
        case 'toggle':
            cell += 2;
            break;
    }
    return cell;
}

const grid2 = new Grid();

lines.forEach(line => {
    const instruction = parseLine(line);

    const xStart = Math.min(instruction.toX, instruction.fromX);
    const yStart = Math.min(instruction.toY, instruction.fromY);
    const xEnd = Math.max(instruction.toX, instruction.fromX);
    const yEnd = Math.max(instruction.toY, instruction.fromY);

    for(let i = xStart; i <= xEnd; i++) {
        const column = grid2.lights[i];
        for(let j = yStart; j <= yEnd; j++) {
            column[j] = doActionPart2(instruction.action, column[j]);
        }
    }
});

let brighness = 0;
grid2.lights.forEach(lightCol => {
    lightCol.forEach(bulb => {
        if(bulb) {
            brighness += bulb;
        }
    });
});

console.log('Part 2 : ' + brighness);