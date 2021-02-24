import { createContext, useState, ReactNode, useContext } from 'react'
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

}
export const ChallengeContext = createContext({} as ChallendeContextData );

export function ChallengesProvider( { children } : ChallengesProviderProps ){
    const [level, setLevel] = useState(0);
    const [currentExperience, setCurrenteExperience] = useState(0);
    const [challengesCompleted,setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null);

    function levelUp(){
        setLevel(level+1)
    }

    function startNewChallenge(){
       const randomChallenge = Math.floor(Math.random() * challengs.length);
       const chalange = challengs[randomChallenge];
       setActiveChallenge(chalange);
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    const experienceToNextLevel = Math.pow( ( level + 2) * 4 , 2 );

    return(
        <ChallengeContext.Provider value={{
            level, levelUp,currentExperience, challengesCompleted,
            startNewChallenge,activeChallenge, resetChallenge, experienceToNextLevel}}>
            {children}
        </ChallengeContext.Provider>
    );
}

