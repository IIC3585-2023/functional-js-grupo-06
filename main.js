const fs = require('fs');
const f = require('./functions.js');

const archToStr = (str) => fs.readFileSync(str).toString();

// Archivos de texto de prubea
const exampleText = archToStr('./texts/example.txt');
const fitnessTestText = archToStr('./texts/fitnessTest.txt');
const linuxText = archToStr('./texts/linux.txt');
const loremText = archToStr('./texts/lorem.txt');
const sopaipillasText = archToStr('./texts/sopaipillas.txt');
const shrekText = archToStr('./texts/shrek.txt');
const beeMovieText = archToStr('./texts/beeMovie.txt');

// Funciones disponibles
// text => f.blankSpaces(text, n)
// text => f.paragraphSpacing(text, n)
// text => f.limitWidth(text, n)
// text => f.identation(text, n)
// text => f.ignoreParagraphLess(text, n)
// text => f.ignoreParagraphMore(text, n)
// text => f.paragraphPerPhrase(text)
// text => f.maxPhrases(text, n)

// Definición de pipe vista en clases
const pipe = (functions) => data => {
    return functions.reduce((value, func) => func(value), data);
};

const pipelineExampleText = pipe([
    text => f.paragraphPerPhrase(text),
    text => f.paragraphSpacing(text, 3),
]);

const pipelineFitnessTestText = pipe([
    text => f.identation(text, 4),
    text => f.ignoreParagraphMore(text, 1),
]);

const pipelineLinuxText = pipe([
    text => f.limitWidth(text, 80),
    text => f.blankSpaces(text, 5),
]);

const pipelineLoremText = pipe([
    text => f.paragraphSpacing(text, 5),
    text => f.ignoreParagraphLess(text, 9),
    text => f.maxPhrases(text, 3),
    text => f.paragraphPerPhrase(text),
]);

const pipelineSopaipillasText = pipe([
    text => f.paragraphSpacing(text, 2),
    text => f.limitWidth(text, 40),
    text => f.identation(text, 8),
]);

const pipelineShrekText = pipe([
    text => f.sangria(text, 8),
    text => f.ignoreParagraphMore(text, 15),
    text => f.blankSpaces(text, 6),
    text => f.maxWidth(text, 35),
]);

const pipelineBeeMovieText = pipe([
    text => f.ignoreParagraphLess(text, 15),
    text => f.paragraphPerPhrase(text),
]);

// Ejecución de pipelines - Descomentar opción para probar
// const fInput = pipelineExampleText(exampleText);
// const fInput = pipelineFitnessTestText(fitnessTestText);
// const fInput = pipelineLinuxText(linuxText);
// const fInput = pipelineLoremText(loremText);
// const fInput = pipelineSopaipillasText(sopaipillasText);
const fInput = pipelineShrekText(shrekText);
// const fInput = pipelineBeeMovieText(beeMovieText);

// Para escribir archivos
fs.writeFile('output.txt', fInput, (err) => {
    if (err) throw err;
})