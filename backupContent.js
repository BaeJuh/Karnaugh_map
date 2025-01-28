import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

import { grayCode, getVariables } from "../modules/moduleOfContent.mjs";

const Content = () => {
    const cellSize = 80;
    const tagSize = 50;
    const [inputText, setInputText] = useState("A, B, C");
    const [variables, setVariables] = useState(getVariables(inputText) || []);
    const [[variableTag, rowTag, colTag], setRowColTag] = useState([]);
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

            // const [rowVariable, colVariable] = [[], []];
            // variables.forEach((variable, i) => {
            //     if (variableCount === 1) {
            //         rowVariable.push(variable);
            //     } else {
            //         const border = Math.floor(variableCount / 2);
            //         console.log(border, divisor);
            //         (i < border) && (rowVariable.push(variable));
            //         (i < border) || (colVariable.push(variable));
            //     }
            // });
            const border = Math.floor(variableCount / 2);
            const [rowVariable, colVariable] = variableCount === 1 ? [variables, []] : [variables.slice(0, border), variables.slice(border)];

            // const [rowTagList, colTagList] = [[], []];
            const variableTag = (
                <div className={styles.variable}>
                    <div className={styles.colVariable}><p>{colVariable.join(" ")}</p></div>
                    <div className={styles.rowVariable}><p>{rowVariable.join(" ")}</p></div>
                </div>
            );

            const [rowTruthTable, colTruthTable] = [grayCode(rowVariable.length), grayCode(colVariable.length)];

            const rowTagList = rowTruthTable.map((rowCase, i) => {
                return [<div key={`rowTag_${i}`} className={styles.rowTag}><span>{rowCase.join(" ")}</span></div>];
            });

            const colTagList = colTruthTable.map((colCase, i) => {
                return <div key={`colTag_${i}`} className={styles.colTag}>{colCase.join(" ")}</div>;
            });

            const cellList = rowTruthTable.map((rowCase, row_i) => {
                return colTruthTable.map((colCase, col_i) => {
                    const identifier = `cell_${row_i}_${col_i}`;
                    // new Cell ~~~~
                    return (
                        <div key={identifier} className={styles.cell} onClick={(e) => {}}>
                            {`${rowCase.join(" ")} ${colCase.join(" ")}`}
                        </div>);
                });
            });
            // rowTruthTable.forEach((rowCase, i) => {
            //     rowTagList.push(<div key={`rowTag_${i}`} className={styles.rowTag}><span>{rowCase.join(" ")}</span></div>);
            // });
            // colTruthTable.forEach((colCase, i) => {
            //     colTagList.push(<div key={`colTag_${i}`} className={styles.colTag}>{colCase.join(" ")}</div>);
            // });

            // const cellList = [];
            // for (let i = 0; i < row; i++) {
            //     cellList.push([]);
            //     for (let j = 0; j < col; j++) {
            //         cellList[i].push(<div key={`cell_${i}_${j}`} className={styles.cell}>{`${rowTruthTable[i].join(" ")} ${colTruthTable[j].join(" ")}`}</div>);
            //     }
            // }
            setCells(cellList);
            setRowColTag([variableTag, rowTagList, colTagList]); // 순서 반드시 확인할 것 [[variableTag, rowTag, colTag], setRowColTag]
            setRowCol([row, col]);
        }

    }, [variables]);

    return (
        <div className={styles.contentArea}>
            <div className={styles.inputArea}>
                <input value={inputText} onChange={e => setInputText(e.target.value)}></input>
                <p className={styles.explanation}>변수 이름 (쉼표로 구분)</p>
            </div>
            {cells === null ? "변수를 입력해주세요." : <div className={styles.cellArea} style={{ width: `${(col * cellSize) + tagSize}px` }}>
                {variableTag}
                <div className={styles.colTags}>{colTag}</div>
                <div className={styles.rowTags} style={{ width: `${tagSize}px` }}>{rowTag}</div>
                <div className={styles.cellTable} style={{ width: `${(col * cellSize)}px` }}>
                    {cells}
                </div>
            </div>}
            <div className={styles.formulaArea}>
                <h1>FALSE</h1>
            </div>
        </div>
    );
}

export default Content;