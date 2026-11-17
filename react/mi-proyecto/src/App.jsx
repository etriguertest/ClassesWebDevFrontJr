import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <br />
      <br />
 
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 2)}
        >
          Count is {count}
        </button>

    </>
  )
}

export default App
