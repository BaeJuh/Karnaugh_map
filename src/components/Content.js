import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

import { getVariables } from "../modules/moduleOfContent.mjs";

import TruthTable from "./Content_TruthTable";
import CellTable from "./Content_CellTable";
import Formula from "./Content_Formula";

const Content = () => {
    const [inputText, setInputText] = useState("A, B, C"); // string // for { onChange={e => setInputText(e.target.value)} }
    const [variables, setVariables] = useState(getVariables(inputText)); // list ["A", "B", "C"]
    const [cells, setCells] = useState(null); // instance of Cell

    useEffect(() => {
        const variables = getVariables(inputText);
        if (variables.length <= 6) {
            setVariables(variables);
        }
    }, [inputText]);

    const limitVariableCount = (e) => {
        (getVariables(e.target.value).length > 6) || (setInputText(e.target.value));
    }
    return (
        <div className={styles.contentArea}>
            <div className={styles.inputArea}>
                <input value={inputText} onChange={e => { limitVariableCount(e) }} placeholder="A, B, C"></input>
                <p className={styles.explanation}>변수 6개까지 입력 가능(쉼표로 구분)</p>
            </div>
            <div className={styles.tableArea}>
                {inputText === "" ? "변수를 입력해주세요." :
                    <>
                        <CellTable variables={variables} cells={[cells, setCells]}></CellTable>
                        <TruthTable variables={variables} cells={cells}></TruthTable>
                    </>
                }
            </div>
            <Formula variables={variables} cells={cells}></Formula>
        </div>
    );
}

export default Content;