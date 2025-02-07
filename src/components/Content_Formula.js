import { useEffect, useState } from "react";
import styles from "../style/Content_Formula.module.scss";

import { KarnaughMap } from "../modules/process.mjs";

import { IoCloseSharp } from "react-icons/io5";

const Formula = (props) => {
    const { cells, variables } = props;
    const [formula, setFormula] = useState("");

    const [isPopup, setIsPopup] = useState(false);

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
            <button className={styles.popupButton} onClick={e => { setIsPopup(true) }}>결과 보기</button>
            {isPopup ? <div className={styles.popupArea} onClick={e => {setIsPopup(false)}}>
                <div className={styles.popupContent}>
                    <div className={styles.popupTitle} >
                        <h2>논리식</h2>
                        <button className={styles.decoButton}>
                            <IoCloseSharp className={styles.closeButton} size="28" />
                        </button>
                    </div>
                    <p>{formula ? formula : "FALSE"}</p>
                </div>
            </div> : null}

        </div>
    );
}

export default Formula;