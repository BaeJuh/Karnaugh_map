import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

const Content = () => {
    const cellWidth = 80;
    const [inputText, setInputText] = useState("A, B, C");
    const [variables, setVariables] = useState(getVariables(inputText) || []);
    const [cells, setCells] = useState([] || null);
    const [cellAreaWidth, setCellAreaWidth] = useState(cellWidth);

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
                boolShuffler(rowVariable.length), boolShuffler(colVariable.length)
            ];

            const cellList = [[<div key={`variable`} className={styles.variable}></div>]];

            rowTruthTable.forEach((rowCase, i) => {
                cellList.push([<div key={`rowTag_${i}`} className={styles.rowTag}><span>{rowCase.join(" ")}</span></div>]);
            });

            colTruthTable.forEach((colCase, i) => {
                cellList[0].push(<div key={`colTag_${i}`} className={styles.colTag}>{colCase.join(" ")}</div>);
            });

            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    cellList[i + 1].push(<div key={`cell_${i}_${j}`} className={styles.cell}>.</div>);
                }
            }

            setCells(cellList);
            setCellAreaWidth((col * cellWidth) + cellWidth / 2);
        }

    }, [variables]);

    return (
        <div className={styles.contentArea}>
            <div className={styles.inputArea}>
                <input value={inputText} onChange={e => setInputText(e.target.value)}></input>
                <p className={styles.explanation}>변수 이름 (쉼표로 구분)</p>
            </div>
            <div className={styles.cellArea} style={{ width: `${cellAreaWidth}px` }}>
                {cells ? cells : "변수를 입력해주세요."}
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

export default Content;