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
        return <span>Loading...</span>
    }
    if (error !== undefined) {
        return <span className={styles.card}>{`Error: ${error}`}</span>
    }
    if (data !== undefined) {
        return <span>{`Message: ${data?.message}`}</span>
    }
    return <span>{`Error: ${DEFAULT_MESSAGE}`}</span>
};

export default HelloMessage;