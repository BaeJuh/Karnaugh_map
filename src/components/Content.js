import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

import { grayCode, getVariables } from "../modules/moduleOfContent.mjs";
import { Cell, KarnaughMap, karnaughMap } from "../modules/linkedList.mjs";

const Content = () => {
    const cellSize = 80;
    const tagSize = 50;
    const [inputText, setInputText] = useState("A, B, C"); // string // for { onChange={e => setInputText(e.target.value)} }
    const [variables, setVariables] = useState(getVariables(inputText)); // list ["A", "B", "C"]
    const [[variableTag, rowTag, colTag], setRowColTag] = useState([]); // JSX
    const [cells, setCells] = useState(null); // instance of Cell
    const [cellBox, setCellBox] = useState(null); // JSX
    const [[row, col], setRowCol] = useState([0, 0]); // for dynamic display

    useEffect(() => {
        setVariables(getVariables(inputText));
    }, [inputText]);

    useEffect(() => {
        // setCells(null);
        if (variables.length !== 0) {
            const variableCount = variables.length;
            const cellCount = 2 ** variableCount;
            const divisor = [...new Array(Math.floor(cellCount ** 0.5))]
                .reduce((divisor, _, i) => {
                    return cellCount % (i + 2) === 0 ? i + 2 : divisor;
                }, 0);

            const [row, col] = [divisor, cellCount / divisor];

            const border = Math.floor(variableCount / 2);
            const [rowVariable, colVariable] = variableCount === 1 ? [variables, []] : [variables.slice(0, border), variables.slice(border)];

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
                    // initCellStatus[row_i].push(false);
                    const identifier = `cell_${row_i}_${col_i}`;
                    const cell = new Cell(identifier);
                    cell.value = [...rowCase, ...colCase];
                    // return (
                    //     <div key={identifier} className={styles.cell} onClick={(e) => {
                    //         console.log(identifier);
                    //         cell.changeStatus();
                    //         console.log(initCellStatus[row_i][col_i]); 
                    //         console.log(cell.status);
                    //     }}>
                    //         {`${rowCase.join(" ")} ${colCase.join(" ")}`}
                    //     </div>);
                    return cell;
                });
            });
            setCells(cellList);
            setRowColTag([variableTag, rowTagList, colTagList]); // 순서 반드시 확인할 것 [[variableTag, rowTag, colTag], setRowColTag]
            setRowCol([row, col]);
        }
    }, [variables]);


    useEffect(() => {
        if (cells) {
            setCellBox(cells.map((rowCell) => {
                return rowCell.map((cell) => {
                    return (
                        <div key={cell.id} className={styles.cell} style={cell.status ? { backgroundColor: "#ff7247" } : null}
                            onClick={(e) => {
                                cell.changeStatus();
                                setCells([...cells]);
                            }}>
                            {`${cell.value.join(" ")}`}
                        </div>);
                });
            }));

            const karnaughMap = new KarnaughMap("karnaughMap");
            karnaughMap.run(cells);
        }
    }, [cells]);



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
                    {cellBox}
                </div>
            </div>}
            <div className={styles.formulaArea}>
                <h1>FALSE</h1>
            </div>
        </div>
    );
}

export default Content;