import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

let countdownTimeout: NodeJS.Timeout;

interface countdownContext{
    minutes: number;
    seconds: number;
    isActive : boolean;
    hasFinished: boolean;
    startCountdown: ()=>void;
    stopCountdown: ()=> void;
}

interface ContextProviderProps{
    children:ReactNode;
}

export const CountdowContext = createContext({} as countdownContext)

export function CountdownProvider( {children} : ContextProviderProps ){const { startNewChallenge } = useContext(ChallengeContext);
   
const[time, setTime] = useState(0.1*60);
const[isActive, setIsActive] = useState(false);
const[hasFinished, setHasFinished] = useState(false);

const minutes = Math.floor(time/60);
const seconds = time % 60;

function startCountdown(){
    setIsActive(true);
}

function stopCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1*60);
    setHasFinished(false);
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

    return(
        <CountdowContext.Provider value={{
            minutes,seconds,isActive,hasFinished,startCountdown,stopCountdown
        }}>
            {children}
        </CountdowContext.Provider>
    );
}