const fs = require('fs');
var user_file = './example.txt';
const archToStr = (str) => fs.readFileSync(str).toString();

const esParrafo = (str, char) => {if (char == '\n' && str[str.length - 1] == '.') {return true;}}

// El ancho del texto debe ser a lo más n 
const maxLength = (str, n) => {
    let newString = ''
    let word = ''
    let lineCount = 0
    for (let char of str) {
        if (char != '\n'){
            lineCount += 1;
        }
        if (char == ' ' || char == '.'){
            if (lineCount >= n){
                newString += '\n';
                lineCount = word.length + 1;
            }
            newString += word + char;
            word = '';
        }
        else if (char == '\n'){
            lineCount = 0;
            newString += char;
        }
        else {
            word += char;
        }
    };
    return newString
}
// Cada párrafo debe tener ​n​ espacios de sangría
const sangria =  (str, n) => {
    let newString = ' '.repeat(n)
    for ( let char of str) {
        if (newString[newString.length-1]=='.' && char == '\n') {
            newString += char + ' '.repeat(n);
            continue
        }
        newString += char;
    }
    return newString;
}

// Solo las primeras ​n​ frases de cada párrafo
const maxFrases = (str, n) => {
    let newString = ''
    let frasesCount = 0
    for (let char of str) {
        if (esParrafo(newString, char)){
            frasesCount = 0;
        }
        if (frasesCount >= n){
            continue
        }
        if (char == '.') {
            frasesCount += 1;
        }
        newString += char;
    }
    return newString
}

fInput = maxLength(sangria(maxLength(maxFrases(archToStr(user_file), 3), 20),5),20)
console.log(fInput)

// Para escribir archevos
// fs.writeFile('tp.txt', fInput, (err) => {
//     if (err) throw err;
//  })