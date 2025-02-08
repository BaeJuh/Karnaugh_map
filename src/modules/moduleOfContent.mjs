const getVariables = (inputText) => {
    return inputText.split(",")
        .filter(variable => variable.trim());
}

const boolShuffler = (stopLength = 0) => {
    const result = [];
    const shuffler = (stopLength, oneEvent = []) => {
        const boolType = [0, 1];
        if (oneEvent.length === stopLength) {
            result.push(oneEvent);
            return;
        } else {
            boolType.forEach((bool) => {
                const eventStorage = [...oneEvent, bool];
                shuffler(stopLength, eventStorage);
            });
        }
    }
    shuffler(stopLength);
    return result;
}

const grayCode = (codeLength) => {
    const rightShift = (arr) => {
        arr.pop();
        arr.unshift(0);

        return arr;
    }
    const originCode = boolShuffler(codeLength);

    return originCode.map((originCodeCase, i) => {
        const shiftedCode = rightShift([...originCodeCase]);

        return originCodeCase.map((bool, j) => {
            return (bool && !shiftedCode[j]) || (!bool && shiftedCode[j]) ? 1 : 0
        });
    });
}

export { grayCode, getVariables };