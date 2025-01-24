import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

const Content = () => {
    const cellSize = 80;
    const tagSize = 50;
    const [inputText, setInputText] = useState("A, B, C");
    const [variables, setVariables] = useState(getVariables(inputText) || []);

    // const [rowTag, setRowTag] = useState([] || null);
    // const [colTag, setColTag] = useState([] || null);
    const [[rowTag, colTag], setRowColTag] = useState([]);
    const [cells, setCells] = useState([] || null);
    const [[row, col], setRowCol] = useState([0, 0]);

    useEffect(() => {
        setVariables(getVariables(inputText));
    }, [inputText]);

    useEffect(() => {
        setCells(null);
        if (variables.length !== 0) {
            const variableCount = variables.length;
            const cellCount = 2 ** variableCount;
            const divisor = [...new Array(Math.floor(cellCount ** 0.5))]
                .reduce((divisor, _, i) => {
                    return cellCount % (i + 2) === 0 ? i + 2 : divisor;
                }, 0);

            const [row, col] = [divisor, cellCount / divisor];

            const [rowVariable, colVariable] = [[], []];
            variables.forEach((variable, i) => {
                const border = Math.floor(variableCount / 2);
                (i < border) && (rowVariable.push(variable));
                (i < border) || (colVariable.push(variable));
            });

            const [rowTruthTable, colTruthTable] = [
                grayCodeSorter(rowVariable.length), grayCodeSorter(colVariable.length)
            ];
            console.log(rowTruthTable)

            // const cellList = [[<div key={`variable`} className={styles.variable}></div>]];
            const [rowTagList, colTagList] = [[], []];
            rowTruthTable.forEach((rowCase, i) => {
                rowTagList.push([<div key={`rowTag_${i}`} className={styles.rowTag}><span>{rowCase.join(" ")}</span></div>]);
            });

            colTruthTable.forEach((colCase, i) => {
                colTagList.push(<div key={`colTag_${i}`} className={styles.colTag}>{colCase.join(" ")}</div>);
            });

            const cellList = [];
            for (let i = 0; i < row; i++) {
                cellList.push([]);
                for (let j = 0; j < col; j++) {
                    cellList[i].push(<div key={`cell_${i}_${j}`} className={styles.cell}>{`${rowTruthTable[i].join(" ")} ${colTruthTable[j].join(" ")}`}</div>);
                }
            }

            setCells(cellList);
            setRowColTag([rowTagList, colTagList])
            setRowCol([row, col]);
            // setRowTag(rowTagList);
            // setColTag(colTagList);
        }

    }, [variables]);

    return (
        <div className={styles.contentArea}>
            <div className={styles.inputArea}>
                <input value={inputText} onChange={e => setInputText(e.target.value)}></input>
                <p className={styles.explanation}>변수 이름 (쉼표로 구분)</p>
            </div>
            <div className={styles.cellArea} style={{ width: `${(col * cellSize) + tagSize}px` }}>
                <div className={styles.variable}>
                    <div className={styles.colVariable}><p>B C D</p></div>
                    <div className={styles.rowVariable}><p>A</p></div>
                </div>
                <div className={styles.colTags}>{colTag}</div>
                <div className={styles.rowTags} style={{ width: `${tagSize}px` }}>{rowTag}</div>
                <div className={styles.cellTable} style={{ width: `${(col * cellSize)}px` }}>
                    {cells}
                </div>
            </div>
            <div className={styles.formulaArea}>
                <h1>FALSE</h1>
            </div>
        </div>
    );
}

const getVariables = (inputText) => {
    return inputText.split(",")
        .filter(variable => variable.trim())
        .map(variable => variable.trim());
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

const grayCodeSorter = (codeLength) => {
    const rightShift = (arr) => {
        arr.pop();
        arr.unshift(0);

        return arr;
    }
    const result = [];
    const originCode = boolShuffler(codeLength);

    for (let i = 0; i < (2 ** codeLength); i++) {
        const newCode = [];
        const shiftedCode = rightShift([...originCode[i]]);

        for (let j = 0; j < codeLength; j++) {
            // newCode.push(originCode[i][j] === shiftedCode[j] ? 0 : 1);
            newCode.push((originCode[i][j] && !shiftedCode[j]) || (!originCode[i][j] && shiftedCode[j]) ? 1 : 0);
        }
        result.push(newCode);
    }

    return result;
}

export default Content;