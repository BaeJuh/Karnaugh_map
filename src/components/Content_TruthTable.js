import { useEffect, useState } from "react";
import styles from "../style/Content_TruthTable.module.scss";

import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TruthTable = (props) => {
    const { cells, variables, isMobile } = props;
    const [truthTable, setTruthTable] = useState(null);
    const [isClose, setIsClose] = useState(isMobile);

    useEffect(() => {
        if (cells) {
            const truthTableJSX = cells.reduce((acc, row) => {
                return [[...acc], [...row.map((cell) => {
                    const logicFormula = cell.value.map((value, i) => (value === 0 ? `${variables[i]}'` : `${variables[i]} `)).join(" ");
                    const [result, resultColor] = cell.status ? ["T", "#04d9ff"] : ["F", "#ff7247"];
                    return (
                        <div key={cell.id} className={styles.truthTableRow}>
                            <pre>{logicFormula}</pre>
                            <pre style={{ color: resultColor }}>{result}</pre>
                        </div>
                    );
                })]];
            }, []);
            setTruthTable(truthTableJSX);
        }
    }, [cells]);

    // style={{ height: isClose ? "55px" : "90%" }}
    return (
        <div className={styles.truthTable} style={isMobile ? { height: isClose ? "50px" : "200px" } : null}>
            <div className={styles.truthTableTitle} onClick={isMobile ? e => { setIsClose(!isClose) } : null}>
                <h2>
                    Truth Table
                </h2>
                {isMobile ? <div>
                    {isClose ? <FaCaretDown size="32" /> : <FaCaretUp size="32" />}
                </div> : null}
            </div>

            {truthTable}
        </div>
    );
}

export default TruthTable;