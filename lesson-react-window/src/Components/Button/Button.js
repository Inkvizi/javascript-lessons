import styles from './Button.module.css';

export function Button (props) {
    return (
        <div className={styles._}>
            <button 
                className={styles.button} 
                type="button" 
                onClick={props.onClick}
            >
                {props.caption}
            </button>
        </div>
    );
}