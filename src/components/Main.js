import { useEffect, useRef, useState } from "react";

import Content from "./Content";
import WhatIs from "./WhatIs";
import styles from "../style/Main.module.scss";

import { FaQuestion } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { TbPdf } from "react-icons/tb";

const Main = () => {
    const [explainVisible, setVisible] = useState(false);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const titleRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div className={styles.wrapper}
            style={
                isDragging ? {
                    transform: `translate(calc( -50% + ${position.x}px ), calc( -50% + ${position.y}px ))`,
                } : {
                    transform: position.x || position.y ? `translate(calc( -50% + ${position.x}px ), calc( -50% + ${position.y}px ))` : 'translate(-50%, -50%)'
                }
            }
        >
            <div className={styles.title} ref={titleRef} onMouseDown={handleMouseDown}>
                <h2>Karnaugh Map Solver</h2>
                <div className={styles.buttons}>
                    <section className={`${styles.decoButton} ${styles.code}`}>
                        <a className={styles.viewCode}
                            title="소스 코드 보러 가기"
                            href="http://kkms4001.iptime.org/~c21st11/Portfolio/karnaugh_map/src/" target="_blank">
                            <FaCode size="20" className={styles.iconStyle} />
                            {/* View Code */}
                        </a>
                    </section>
                    <section className={`${styles.decoButton} ${styles.pdf}`}>
                        <a className={styles.viewPDF}
                            title="문서 보러 가기"
                            href="/" target="_blank">
                            <TbPdf size="22" className={styles.iconStyle} />
                            {/* View Document */}
                        </a>
                    </section>
                    <button className={styles.decoButton} onMouseOver={e => { setVisible(true) }} onMouseOut={e => setVisible(false)}>
                        <FaQuestion size="17" className={styles.iconStyle}></FaQuestion>
                        <WhatIs visible={explainVisible}></WhatIs>
                    </button>

                </div>

            </div>
            <Content></Content>
        </div>
    );
}

export default Main;