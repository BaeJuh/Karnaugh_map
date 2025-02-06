import { useEffect, useState } from "react";
import styles from "../style/Content_TruthTable.module.scss";

const TruthTable = (props) => {
    const { cells, variables } = props;
    const [truthTable, setTruthTable] = useState(null);
    const [isClose, setIsClose] = useState(false);

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
        <div className={styles.truthTable}>
            <h2 >TruthTable</h2>
            {truthTable}

        </div>
    );
}

export default TruthTable;