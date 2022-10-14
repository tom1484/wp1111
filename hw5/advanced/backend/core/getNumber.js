var number;
var candidates;

const getNumber = () => {
    return number;
}

const genNumber = () => {
    number = '';
    for (let i = 0; i < 4; ) {
        let digit = Math.floor(Math.random() * 9.99).toString();
        if (number.includes(digit)) {
            continue;
        }
        number += digit;
        i++;
    }
}

function getCandidate() {
    const idx = Math.floor(Math.random() * (candidates.size - 0.0001));
    return Array.from(candidates.keys())[idx];
}

function getMatch(base) {
    let A = 0, B = 0;
    for (let i = 0; i < 4; i++) {
        if (number[i] === base[i]) {
            A += 1;
        }
        else if (base.includes(number[i])) {
            B += 1;
        }
    }
    return `${A}A${B}B`;
}

function deleteCandidate(judge) {
    for (let k of candidates.keys()) {
        const match = getMatch(k);
        if (k === '1234') {
            console.log(`${number} ${match}`);
        }
        if (match != judge) {
            candidates.delete(k);
        }
    }
}

const guessNewNumber = (judge) => {
    deleteCandidate(judge);
    number = getCandidate();
    return number;
}

const initialGuess = () => {
    let arr = Array.from(new Array(10000).keys()).map(String);
    for (let i = 0; i < arr.length; i++) {
        while (arr[i].length < 4) {
            arr[i] = '0' + arr[i];
        }
    }
    candidates = new Set(arr);
    for (let k of candidates.keys()) {
        let valid = true;
        for (let c of k) {
            if (k.split(c).length - 1 > 1) {
                valid = false;
            }
        }
        if (!valid) {
            candidates.delete(k);
        }
    }

    number = getCandidate();
    return number;
}

export { getNumber, genNumber, guessNewNumber, initialGuess };