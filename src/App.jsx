import { useState } from 'react'
import './App.css'
import { DatePicker } from './components/DatePicker/DatePicker'
import { Pictures } from './components/Pictures/Pictures';
import { Footer } from './components/Footer/Footer';
import { RandomDay } from './components/RandomDay/RandomDay';

function App() {
  const today = new Date().toISOString().slice(0, 10);
  const [fromDate, setFrom] = useState(today);
  const [toDate, setTo] = useState(today);

  return (
    <div className="App">
      <div className="main">
        <div className="title">
        <h1 className="text-shadow">COSMOS EXPLORER</h1>
        <h4>Explore the Universe • NASA Astronomy Picture Archive</h4>
        </div>
        <section>
          <DatePicker dates={ {setFrom, setTo } } />
          <Pictures dates={{fromDate, toDate}} />
          <RandomDay dates={ {setFrom, setTo } }/>
        </section>
      </div>
     <Footer />
    </div>
  )
}

export default App
