const crypto = require('crypto');

const input = 'bgvyzdsv';
let result = null;
let i = 0;
while(result === null) {
    let value = `${input}${i}`;
    let hash = crypto.createHash('md5').update(value).digest('hex');
    if(hash.substr(0, 6) === '000000') {
        result = i;
    }
    i++;
}
console.log(result);