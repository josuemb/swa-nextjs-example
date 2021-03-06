import { ChangeEvent, FormEvent, useState } from "react";
import HelloMessage from "./HelloMessage";
import styles from '../styles/Home.module.css'

const SayHello = (): JSX.Element => {
    const [tempName, setTempName] = useState<string>('');
    const [name, setName] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (tempName && tempName.length > 0) {
            setName(tempName);
        } else {
            setName(null);
        }
    }

    const handleChangeName = async (event: ChangeEvent<HTMLInputElement>) => {
        setTempName(event.target.value);
    }

    return (
        <div className={styles.grid}>
            <div className={styles.card}>
                <form onSubmit={handleSubmit} autoComplete="new-password">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={tempName} onChange={handleChangeName} />
                    <button type="submit">Say Hello</button>
                </form>                
            </div>
            <HelloMessage name={name} />
        </div>
    )
};

export default SayHello