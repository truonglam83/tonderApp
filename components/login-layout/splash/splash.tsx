import React from 'react'
import styles from './splash.module.scss';
type Props = {}

const Splash = (props: Props) => {
    return (
        <section className={styles.splash}>
            <p className={styles.splash__title}>Tonder</p>
        </section>
    )
}

export default Splash