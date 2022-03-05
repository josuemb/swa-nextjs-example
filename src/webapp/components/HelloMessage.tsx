import useHello from "./useHello";
import styles from '../styles/Home.module.css'

const DEFAULT_MESSAGE = 'Not able to get hello message!';

export interface HelloMessageProps {
    name: string | null
}

const HelloMessage = (props: HelloMessageProps): JSX.Element => {
    const { isLoading, data, error } = useHello(props.name);
    if (props.name === null) {
        return <></>
    }
    if (isLoading === true) {
        return (
            <div className={styles.card}>
                <span>Loading...</span>
            </div>
        )
    }
    if (error !== undefined) {
        return (
            <div className={styles.card}>
                <span className={styles.card}>{`Error: ${error}`}</span>
            </div>
        )
    }
    if (data !== undefined) {
        return (
            <div className={styles.card}>
                <span>{`Message: ${data?.message}`}</span>
            </div>
        )
    }
    return (
        <div className={styles.card}>
            <span>{`Error: ${DEFAULT_MESSAGE}`}</span>
        </div>
    )
};

export default HelloMessage;