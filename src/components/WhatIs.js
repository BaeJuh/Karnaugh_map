import styles from "../style/Main.module.scss";

const WhatIs = (props) => {
    const {visible} = props;

    return (
        <div className={styles.whatIs} style={{ display: visible ? "inline-block" : "none" }}>
            <p>
                카르노 맵(Karnaugh Map)은 복잡한<br></br>
                논리식을 보다 쉽게 다룰 수 있도록<br></br>
                도와주는 간소화 기법 중 하나입니다.
                <br></br><br></br>
                &lt; 사용 방법 &gt;<br></br>
                1. 변수를 입력합니다.<br></br>
                2. 화면에 표시된 박스를 선택합니다.<br></br>
                3. 생성된 진리표와 논리식을 확인합니다.
            </p>
        </div>
    );
}

export default WhatIs;