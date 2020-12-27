const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
let floor = 0;
let basementPos = null;
for(let pos = 0; pos < input.length; pos++) {
    input.charAt(pos) === '(' ? floor++ : floor--;
    if(floor === -1 && basementPos == null) {
        basementPos = pos + 1;
    }
}
console.log(floor);
console.log(basementPos);