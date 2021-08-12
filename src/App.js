import { HolidayAPI } from 'holidayapi';
const key = '3fcaf5be-c201-4a4d-8644-8669aac1d051'
const holidayApi = new HolidayAPI({ key });
holidayApi.holidays({
  country: 'ES',
  year: '2020',
});

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
