import { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import challengs from '../../challenges.json';

interface ChallengesProviderProps{
    children:ReactNode;
}

interface challenges{
    type: 'body' | 'eye'
    description: string,
    amount: number
}

interface ChallendeContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: challenges ;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
}
export const ChallengeContext = createContext({} as ChallendeContextData );

export function ChallengesProvider( { children } : ChallengesProviderProps ){
    const [level, setLevel] = useState(0);
    const [currentExperience, setCurrenteExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(()=>{
        Notification.requestPermission();
    },[activeChallenge]);

    function levelUp(){
        setLevel(level+1)
    }

    function startNewChallenge(){
       const randomChallenge = Math.floor(Math.random() * challengs.length);
       const chalange = challengs[randomChallenge];
       setActiveChallenge(chalange);

       
       new Audio('/notification.mp3').play();
       if(Notification.permission === 'granted'){
        new Notification('Novo desafio 🎉', {
            body: `Valendo ${chalange.amount}`
            
        })
    }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return ;
        }

        const { amount } = activeChallenge;
        let finalExperince = currentExperience + amount;
        
        if(finalExperince >= experienceToNextLevel){
            levelUp();
            finalExperince = finalExperince - experienceToNextLevel;
        }

        setCurrenteExperience(finalExperince);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    const experienceToNextLevel = Math.pow( ( level + 2) * 4 , 2 );

    return(
        <ChallengeContext.Provider value={{
            level, levelUp,currentExperience, challengesCompleted,
            startNewChallenge,activeChallenge, resetChallenge, experienceToNextLevel,
            completeChallenge}}>
            {children}
        </ChallengeContext.Provider>
    );
}

