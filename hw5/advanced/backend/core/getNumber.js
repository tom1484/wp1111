var number;

const getNumber = () => {
    return number;
}

const genNumber = () => {
    number = '';
    for (let i = 0; i < 4; i++) {
        let digit = Math.floor(Math.random() * 9.99).toString();
        number += digit;
    }
    console.log(number);
}

export { getNumber, genNumber };