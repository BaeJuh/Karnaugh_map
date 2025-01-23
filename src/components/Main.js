import Content from "./Content";
import styles from "../style/Main.module.scss";

const Main = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <h2>Karnaugh map solver</h2>
                <button className={styles.decoButton}>
                    X
                </button>
            </div>
            <Content></Content>
        </div>
    );
}

export default Main;