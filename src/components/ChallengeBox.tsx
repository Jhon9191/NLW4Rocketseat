import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdowContext } from '../contexts/CountdowContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);
    const { stopCountdown } = useContext(CountdowContext);

    const resetChallenges = () =>{
        resetChallenge();
        stopCountdown();
    }

    const completedChallenges = () =>{
        completeChallenge();
        stopCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{"Ganhe " + activeChallenge.amount + " xp"}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button 
                        onClick={resetChallenges}
                        className={styles.faileChallenge}
                        type="button">Falhei</button>
                        <button 
                          onClick={completedChallenges}
                        className={styles.sucessedChallenge}
                        type="button">Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeIsNotActive}>
                <strong>Inicie um ciclo para receber desafios para serem cumpridos!</strong>
                <p><img src="icons/level-up.svg" />
                Avance de level completando desafios
                </p>
                </div>
                )}
        </div>
    );
}