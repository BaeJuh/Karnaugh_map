import { useState } from "react";

import Content from "./Content";
import WhatIs from "./WhatIs";
import styles from "../style/Main.module.scss";

import { FaQuestion } from "react-icons/fa";

const Main = () => {
    const [explainVisible, setVisible] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>Karnaugh Map Solver</h2>
                <button className={styles.decoButton} onMouseOver={e => { setVisible(true) }} onMouseOut={e => setVisible(false)}>
                    <FaQuestion size="17" className={styles.whatIsIcon}></FaQuestion>
                    <WhatIs visible={explainVisible}></WhatIs>
                </button>
            </div>
            <Content></Content>
        </div>
    );
}

export default Main;