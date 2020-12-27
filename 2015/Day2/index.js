const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines = input.split(/\r\n|\n/);
const regexp = new RegExp(/^(\d+)x(\d+)x(\d+)$/);
let totalPaperSize = 0;
let totalRibbonSize = 0;
lines.forEach(line => {
    let dimensions = line.match(regexp);
    let length = dimensions[1] | 0;
    let width = dimensions[2] | 0;
    let height = dimensions[3] | 0;
    let lw = length * width;
    let wh = width * height;
    let lh = length * height;
    let minArea = Math.min(lw, wh, lh);
    totalPaperSize += (2*lw) + (2*wh) + (2*lh) + minArea;

    const minPerimeterDimensions = [length, height, width].sort((a, b) => a - b);
    const minPerimeter = minPerimeterDimensions[0] *2 + minPerimeterDimensions[1] *2;
    totalRibbonSize += minPerimeter + (length * width * height);

});

console.log(totalPaperSize);
console.log(totalRibbonSize);