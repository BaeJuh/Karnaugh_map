import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

import { KarnaughMap } from "../modules/process.mjs";

const Formula = (props) => {
    const { cells, variables } = props;
    const [formula, setFormula] = useState("");

    useEffect(() => {
        if (cells) {
            const karnaughMap = new KarnaughMap("karnaughMap");
            const connectedNodes = karnaughMap.run(cells);

            const connectedValues = connectedNodes.map(eachGroup => {
                return eachGroup.map(node => node.value);
            });
            const formulaArray = connectedValues.map(eachGroup => {
                return eachGroup.reduce((groupedValue, currentValue) => {
                    return groupedValue.map((eachValue, i) => {
                        return eachValue === currentValue[i] ? eachValue : null;
                    });
                });
            });
            const formula = formulaArray.map((term) => {
                return term.reduce((termStr, value, i) => {
                    return termStr + (value !== null ? (value === 0 ? `${variables[i]}'` : `${variables[i]}`) : "");
                }, "");
            }).join(" + ");

            setFormula(formula ? formula : (connectedNodes.length > 0 ? "TRUE" : "FALSE"));
        }
    })

    return (
        <div className={styles.formulaArea}>
            <h1>{formula ? formula : "FALSE"}</h1>
        </div>
    );
}

export default Formula;