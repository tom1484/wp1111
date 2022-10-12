var number;

const getNumber = () => {
    return number;
}

const genNumber = () => {
    number = Math.floor(Math.random() * 99.99) + 1;
    console.log(number);
}

export { getNumber, genNumber };