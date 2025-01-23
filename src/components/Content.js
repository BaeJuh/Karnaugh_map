import { useEffect, useState } from "react";
import styles from "../style/Content.module.scss";

const Content = () => {
    const [inputText, setInputText] = useState("A, B, C");
    const [variables, setVariables] = useState(getVariables(inputText) || []);
    const [cells, setCells] = useState([]);
    const [cellAreaWidth, setCellAreaWidth] = useState("0px");

    useEffect(() => {
        setVariables(getVariables(inputText));
    }, [inputText]);
    
    
    
    useEffect(() => {
        const cellCount = 2 ** variables.length;
        const divisor = [...new Array(Math.floor(cellCount ** 0.5))]
            .reduce((divisor, _, i) => {
                return cellCount%(i+2) === 0 ? i+2 : divisor;
            }, 0);

        const [row, col] = [divisor, cellCount / divisor];
        
        const cellList = [];

        for (let i=0; i<row; i++) {
            cellList.push([]);
            for (let j=0; j<col; j++) {
                cellList[i].push(<div key={`cell_${i}_${j}`} className={styles.cell}></div>);
            }
        }

        setCells(cellList);
        setCellAreaWidth(`${col * 80}px`);
    }, [variables]);



    // for (let i = 0; i < 4; i++) {

    //     cellList.push([]);
    //     for (let j = 0; j < 4; j++) {
    //         cellList[i].push(<div key={`cell_${i}_${j}`} className={styles.cell}></div>);
    //     }
    // }

    return (
        <div className={styles.contentArea}>
            <div className={styles.inputArea}>
                <input value={inputText} onChange={e => setInputText(e.target.value)}></input>
                <p className={styles.explanation}>변수 이름 (쉼표로 구분)</p>
            </div>
            <div className={styles.cellArea} style={{width: cellAreaWidth}}>
                {cells}
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

export default Content;