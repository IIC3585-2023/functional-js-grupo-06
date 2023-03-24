const fs = require('fs');

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


// Helper: Contador de frases en parrafo
const countPhrases = (paragraph) => {
    numPhrases = paragraph
        .split(/\. |\? |\! /g)
        .length

    return numPhrases
}

// Se ignoran los párrafos que tienen menos de ​n​ frases
const ignoreParagraphLess = (text, n) => {
    newText = text
        .split(/\n+/g)
        .filter(paragraph => countPhrases(paragraph) >= n)
        .join("\n\n")

    return newText
}

// Se ignoran los párrafos que tienen más de ​n​ frases
const ignoreParagraphMore = (text, n) => {
    newText = text
        .split(/\n+/g)
        .filter(paragraph => countPhrases(paragraph) <= n)
        .join("\n\n")

    return newText
}

// Cada frase debe aparecer en párrafo aparte
// Nota: Se asume que una frase termina con un punto, interrogación o exclamación.
const paragraphPerPhrase = (text) => {
    newText = text
        .replace(/\. |\? |\! /g, '.\n')
        .replace(/\n+/g, '\n\n')

    return newText
}

// Segunda opcion de sangria
const sangria2 = (text, n) => text.replace(/^/gm, ' '.repeat(n))

// Cada frase debe comenzar con n espacios en blanco
const blankSpaces = (text, n) => {
  newText = text.replace(/\. +/g, (match) => "." + " ".repeat(n))
    .replace(/ +\n/g, '\n');
  return newText;
};

// Cada párrafo debe estar separado por n líneas
const paragraphSpacing = (text, n) => {
  newText = text.replace(/\.\n+/g, (match) => "." + "\n".repeat(n+1))
  return newText;
}

// Archivos de texto de prubea
const userFile = archToStr('./texts/example.txt');
const fitnessTestText = archToStr('./texts/fitnessTest.txt');
const linuxText = archToStr('./texts/linux.txt');
const loremText = archToStr('./texts/lorem.txt');

// Pruebas de transformaciones
// fInput = maxLength(sangria(maxLength(maxFrases(userFile, 3), 20),5),20)
// fInput = paragraphPerPhrase(fitnessTestText)
// fInput = ignoreParagraphLess(linuxText, 4)
fInput = sangria2(paragraphPerPhrase(ignoreParagraphMore(loremText, 8)), 7)


// Para escribir archivos
fs.writeFile('output.txt', fInput, (err) => {
    if (err) throw err;
})
