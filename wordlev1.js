const {exec} = require('child_process');

// timing test suite to compare different algorithms
getAllWords(function (allWords) {

    // see how long multiple attempts take
    let avgTime = 0.0;
    const totalSolves = 1000;
    var start = new Date().getTime();
    let attempts = 0;

    for (let i = 0; i < totalSolves; i++) {
        // attempts += solveGeneric(allWords, getValidWordsV3)
        // attempts += solveGeneric(allWords, getValidWordsV2)
        // attempts += solveGeneric(allWords, getValidWordsV1)
        attempts += solveGeneric(allWords, getValidWordsV4, false)
    }

    const end = new Date().getTime();
    const time = end - start;
    console.log(`Avg attempts to solve ${totalSolves} puzzels was: ${attempts / totalSolves}, took ${time}ms`)
})

// Run a single solve
// getAllWords(function (allWords) {
//     solveGeneric(allWords, getValidWordsV4, true)
// })

// Generic solver wrapper
// Generates a random answer, uses the valid word algorithm to narrow down to the solutions
//
function solveGeneric(allWords, validWordFunction, shouldLog) {
    // const answer = allWords[getRandomInt(0, allWords.length)]
    const answer = 'favor'

    log(`The correct answer is: ${answer.toUpperCase()}`, shouldLog)

    let success = false;
    let attempts = 1;

    let guesses = []
    let correctLetters = []
    let correctPositions = ["_", "_", "_", "_", "_",]
    let invalidLetters = []
    let validWords = allWords;

    while (!success) {
        let newWords = [];

        newWords = validWordFunction(validWords, correctLetters, correctPositions, invalidLetters, guesses);

        let guess = getRandomNextGuess(newWords);
        guesses.push(guess)

        log(`Guessing: ${guess.toUpperCase()}`, shouldLog)
        validWords = newWords;

        if (guess === answer) {
            success = true;
            log(`Correct guess: ${answer.toUpperCase()}, took ${attempts} attempts`, shouldLog)
        } else {
            // if we didn't get the right word, did we get any letters in the right place
            attempts++;
            correctLetters, correctPositions, invalidLetters = checkWord(guess, answer, correctLetters, correctPositions, invalidLetters)
        }
    }

    return attempts
}

// heat up your cpu with this one
function getValidWordsV1(validWords) {
    return validWords;
}


// learn using correct letters
function getValidWordsV2(validWords, correctLetters) {
    let newWords = [];
    for (let word of validWords) {
        // check letters
        const wordHasAllLetters = letterTest(correctLetters, word)
        if (!wordHasAllLetters && correctLetters.length !== 0) {
            continue
        }
        newWords.push(word);
    }
    return newWords;
}

// learning using correct letters, and letter placement
function getValidWordsV3(validWords, correctLetters, correctPositions) {
    let newWords = [];
    const correctPositionCount = correctPositions.filter(function (x) {
        return x !== "_"
    }).length;
    for (let word of validWords) {
        // check word position
        const wordInCorrectPosition = positionCheck(word, correctPositions)
        if (!wordInCorrectPosition && correctPositionCount !== 0) {
            continue
        }

        // check letters
        const wordHasAllLetters = letterTest(correctLetters, word)
        if (!wordHasAllLetters && correctLetters.length !== 0) {
            continue
        }

        newWords.push(word);
    }

    return newWords;
}

// Learn with letters, placement, and removing invalid letters
function getValidWordsV4(validWords, correctLetters, correctPositions, invalidLetters, guesses) {
    let newWords = [];
    const correctPositionCount = correctPositions.filter(function (x) {
        return x !== "_"
    }).length;

    for (let word of validWords) {

        if (guesses.includes(word)) {
            continue
        }

        // check word position
        const wordInCorrectPosition = positionCheck(word, correctPositions)
        if (!wordInCorrectPosition && correctPositionCount !== 0) {
            continue
        }

        // check letters
        const wordHasAllLetters = letterTest(correctLetters, word)
        if (!wordHasAllLetters && correctLetters.length !== 0) {
            continue
        }

        // check invalid positions
        const containsInvalidLetter = invalidLetterCheck(word, invalidLetters)
        if (containsInvalidLetter) {
            continue
        }

        newWords.push(word);
    }

    return newWords;
}

// For a given guess and answer, return info about the word
function checkWord(guess, answer, correctLetters, correctPositions, invalidLetters) {
    // if we didn't get the right word, did we get any letters in the right place
    for (let gl = 0; gl < guess.length; gl++) {
        let letterValid = false;
        for (let al = 0; al < answer.length; al++) {
            if (guess[gl] === answer[al]) {
                if (gl === al) {
                    // right guess in right place
                    correctPositions[gl] = guess[gl]
                } else {
                    // right letter in wrong place
                }

                // don't add the same letter twice
                letterValid = true;
                if (!correctLetters.includes(guess[gl])) {
                    correctLetters.push(guess[gl])
                }
            }
        }
        if (!letterValid) {
            // letter not in the word
            if (!invalidLetters.includes(guess[gl])) {
                invalidLetters.push(guess[gl])
            }
        }
    }

    return correctLetters, correctPositions, invalidLetters
}

// Check if a word contains all letters in a list
function letterTest(correctLetters, word) {
    let wordHasAllLetters = true;

    // check letters
    for (let cl of correctLetters) {
        let wordHasLetter = false
        for (let gl = 0; gl < word.length; gl++) {
            if (cl === word[gl]) {
                wordHasLetter = true;
                break;
            }
        }
        if (!wordHasLetter) {
            wordHasAllLetters = false;
            break;
        }
    }
    return wordHasAllLetters
}

// Check if a word contains all letters in a list in the same position
function positionCheck(word, correctPositions) {
    let wordInCorrectPosition = false;
    for (let k = 0; k < correctPositions.length; k++) {
        if (correctPositions[k] === "_") {
            continue
        }
        if (word[k] !== correctPositions[k]) {
            // letter not in word in right place, discard word
            wordInCorrectPosition = false;
            break;
        } else {
            wordInCorrectPosition = true;
        }
    }
    return wordInCorrectPosition
}

function invalidLetterCheck(word, invalidLetters) {
    let containsInvalidLetter = false;

    // check letters
    for (let cl of invalidLetters) {
        for (let gl = 0; gl < word.length; gl++) {
            if (cl === word[gl]) {
                containsInvalidLetter = true;
                break;
            }
        }
    }
    return containsInvalidLetter
}

// Get all the possible 5 letter words from /usr/share/dict/words
function getAllWords(cb) {
    const getAllWordsCmd = "cat /usr/share/dict/words | grep -x '^[a-z]\\{5,5\\}'";
    exec(getAllWordsCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        const allWords = stdout.split("\n");
        console.log(`Found ${allWords.length} possible 5 letter words`)

        cb(allWords)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomNextGuess(wordList) {
    return wordList[getRandomInt(0, wordList.length)]
}

function log(input, shouldLog) {
    if (shouldLog) {
        console.log(input)
    }
}

