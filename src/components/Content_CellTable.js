import { useEffect, useState } from "react";
import styles from "../style/Content_CellTable.module.scss";

import { grayCode } from "../modules/moduleOfContent.mjs";
import { Cell } from "../modules/process.mjs";

const CellTable = (props) => {
    const { variables, cells: [cells, setCells] } = props;
    const cellSize = 90;
    const mobileSize = 50;
    const tagSize = 60;
    const [[variableTag, rowTag, colTag], setRowColTag] = useState([]); // JSX
    const [[row, col], setRowCol] = useState([0, 0]); // for dynamic display
    const [cellBox, setCellBox] = useState(null); // JSX

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    useEffect(() => {
        setIsMobile(window.innerWidth <= 500);
    }, []);

    useEffect(() => {
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
                return <div key={`rowTag_${i}`} className={styles.rowTag}><span>{rowCase.join(" ")}</span></div>;
            });

            const colTagList = colTruthTable.map((colCase, i) => {
                return <div key={`colTag_${i}`} className={styles.colTag}>{colCase.join(" ")}</div>;
            });

            const cellList = rowTruthTable.map((rowCase, row_i) => {
                return colTruthTable.map((colCase, col_i) => {
                    const cell = new Cell(`cell_${row_i}_${col_i}`);
                    cell.value = [...rowCase, ...colCase];
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
                        <div key={cell.id} className={styles.cell} style={cell.status ? {backgroundColor:  "#ff7247" } : null }
                            onClick={(e) => {
                                cell.changeStatus();
                                setCells([...cells]);
                            }}>&nbsp;
                        </div>
                    );
                });
            }));
        }
    }, [cells]);

    return (
        <div className={styles.bigBox}>
            <div className={styles.cellArea} style={{ minWidth: `${(col * (isMobile ? mobileSize : cellSize)) + tagSize}px`, width: `${(col * (isMobile ? mobileSize : cellSize)) + tagSize}px`, height: row > 4 ? "100%" : `${(row * (isMobile ? mobileSize : cellSize)) + tagSize}px` }}>
                {variableTag}
                <div className={styles.colTags}>{colTag}</div>
                <div className={styles.rowTags} style={{ width: `${tagSize}px` }}>{rowTag}</div>
                <div className={styles.cellTable} style={{ width: `${(col * (isMobile ? mobileSize : cellSize))}px`}}>
                    {cellBox}
                </div>
            </div>
        </div>
    );
}

export default CellTable;