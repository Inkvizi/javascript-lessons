import styles from './Window.module.css';
import anime from "animejs";
import {Button} from "../Button/Button";
import {useRef, useEffect, useState} from 'react';

export function Window() {
    const animationRef = useRef(null);
    const buttonRef = useRef(null);
    const windowRef = useRef(null);
    const [buttonLeft, setButtonLeft] = useState(0);
    const [buttonTop, setButtonTop] = useState(0);
    useEffect(() => {
        if (buttonLeft === 0) {
            setButtonLeft(buttonRef.current.offsetLeft);
        }
        if (buttonTop === 0) {
            setButtonTop(buttonRef.current.offsetTop);
        }
        animationRef.current = anime({
            targets: buttonRef.current,
            left: buttonLeft,
            top: buttonTop,
            easing: "easeOutCirc"
        });
    }, [buttonLeft, buttonTop]); 
    return (
        <div className={styles._} ref={windowRef}>
            <div className={styles.label}>Вам нравится курс по JavaScript?</div>
            <div className={styles.button}>
                <Button onClick={()=>{alert("Отлично!")}} caption="Да, конечно!"></Button>
            </div>
            <div 
                className={styles.jokeButton}
                onMouseOver={()=>{
                    setButtonLeft(getRandomDistance(windowRef.current.clientWidth - buttonRef.current.clientWidth));
                    setButtonTop(getRandomDistance(windowRef.current.clientHeight - buttonRef.current.clientHeight));
                }}
                ref={buttonRef}
            >
                <Button onClick={()=>{alert("Вы очень настойчивы!")}} caption="Не знаю"></Button>    
            </div> 
            
        </div>
    );
}

const getRandomDistance = (maxDistance) => {
    return Math.floor(Math.random() * (maxDistance));
};