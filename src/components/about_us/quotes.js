import React from "react";
import styles from './quotes.module.css';

const Quotes = () => {
    return (
        <div className={styles.quotesWrapper}>
            <div className={styles.borderUp}></div>
            <div className={styles.containerQuote}>
                <p>"Taking care of your mental health is an act of self-love."</p>
            </div>
            <div className={styles.borderDown}></div>
        </div>
    );
};

export default Quotes;