import {useState, useEffect, useContext} from 'react';
import { start } from 'repl';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengeContext);
   
    const[time, setTime] = useState(0.1*60);
    const[isActive, setIsActive] = useState(false);
    const[hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, "0").split("");
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, "0").split("");

    function startCountdown(){
        setIsActive(true);
    }

    function stopCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1*60);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time-1);
            }, 1000);
        }else if(isActive && time === 0){
            startNewChallenge();
            setHasFinished(true);
            setIsActive(false);
        }
    },[isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            {hasFinished ? (
             <button
             disabled
             className={styles.startCountdowButton}>Ciclo encerrado</button>
            ) : (
                <>
                 {isActive ? (
                  <button
                  onClick={stopCountdown}
                  type="button" className={`${styles.startCountdowButton} ${styles.stopCountdowButton} `}>Abandonar ciclo</button>
            ): (
                <button
                onClick={startCountdown}
                type="button" className={styles.startCountdowButton}>Iniciar um ciclo</button>
            )}
                </>
            )}
          
       

       
        </div>
    );

}