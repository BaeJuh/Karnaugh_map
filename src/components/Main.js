import Content from "./Content";
import styles from "../style/Main.module.scss";

import { RiCloseLine } from "react-icons/ri";

const Main = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>Karnaugh Map Solver</h2>
                <button className={styles.decoButton}>
                    <RiCloseLine size="25" className={styles.closeIcon}></RiCloseLine>
                </button>
            </div>
            <Content></Content>
        </div>
    );
}

export default Main;