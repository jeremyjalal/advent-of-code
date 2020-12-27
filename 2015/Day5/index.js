const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
const lines = input.split(/\r\n|\n/);
const vowelsRegexp = new RegExp(/([aeiou]).*([aeiou]).*([aeiou])/);
const repeatCharRegexp = new RegExp(/([a-z])\1{1,}/);
const forbiddenStringRegexp = new RegExp(/(ab|cd|pq|xy)/);
let niceStrings = [];
lines.forEach(line => {
    const hasTwoVowels = vowelsRegexp.test(line);
    const hasRepeteadChars = repeatCharRegexp.test(line);
    const hasForbiddenStrings = forbiddenStringRegexp.test(line);
    if(hasTwoVowels && hasRepeteadChars && !hasForbiddenStrings) {
        niceStrings.push(line);
    }
});
console.log('Part one : ' + niceStrings.length);

const twoPairsOfLettersregexp = new RegExp(/([a-z][a-z]).*?\1{1,}/);
const repeatCharWithOneBetweenRegexp = new RegExp(/([a-z])[a-z]\1{1,}/);
niceStrings = [];
lines.forEach(line => {
    const hasTwoPairsOfLetters = twoPairsOfLettersregexp.test(line);
    const hasRepeatedChatWithOneBetween = repeatCharWithOneBetweenRegexp.test(line);
    if(hasTwoPairsOfLetters && hasRepeatedChatWithOneBetween) {
        niceStrings.push(line);
    }
});
console.log('Part two : ' + niceStrings.length);