import { useState } from 'react';
import styles from './HelloWorld.module.css';

const HelloWorld = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  return (
    <div>
      <h1>Olá Mundo!</h1>
      <div className={styles.counter}>
        <button onClick={decrement}>-</button>
        <span>{counter}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};

export default HelloWorld;
