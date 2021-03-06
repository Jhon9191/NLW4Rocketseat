import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level } = useContext(ChallengeContext);
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Jhon9191.png" alt="João Antônio"/>
            <div>
                <strong>
                    <h4>João Antônio</h4>
                </strong>
                <p><img src="icons/level.svg" alt="Level up"/> Level {level}</p>
            </div>
        </div>
    );
}