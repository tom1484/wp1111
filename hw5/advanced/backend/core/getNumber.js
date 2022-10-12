var number;

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
    console.log(number);
}

export { getNumber, genNumber };