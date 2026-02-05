import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [element, setElement] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 10)
    }, 10);

    return () => clearInterval(interval)

  }, [isRunning])

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const ms = Math.floor((time % 1000) / 10);

  return (
    <>
      <h1>Stopwatch App</h1>
      <div className='button-container'>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button
          onClick={() => {
            if (time === 0) return;
            setIsRunning(false);
            setTime(0);
            setElement(true)
            setHistory([...history, `${minutes}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`])
          }}>Stop</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
      </div>
      <div className="display">
        {minutes}:{seconds.toString().padStart(2, "0")}.
        {ms.toString().padStart(2, "0")}
      </div>
      <div className='history'>
        {element ? <button onClick={() => {
          setHistory([]);
          setElement(false)
        }} className='clear-button'>Clear history</button> : null}
        <ol>
          {history.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default App
