import * as React from "react";
import { useState, useEffect } from "react";

import logo from './logo.png';
import './App.css';
import { authenticate, similaritySearchById, getEnvironments } from 'jai-sdk';

const { REACT_APP_JAI_SDK_KEY } = process.env;

function App() {

  const [loaded, setLoaded] = useState(false);
  const [environments, setEnvironments] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');

  useEffect(() => {

    if (!REACT_APP_JAI_SDK_KEY)
      return;

    if (loaded)
      return;

    setLoaded(true);

    authenticate(REACT_APP_JAI_SDK_KEY);

    getEnvironments().then(data => {
      console.log(data)
      setEnvironments(data);
    })

  }, []);

  function getApiKey() {
    if (!REACT_APP_JAI_SDK_KEY)
      return "Please, set the REACT_APP_JAI_SDK_KEY in your env.local file";

    const start = REACT_APP_JAI_SDK_KEY.substring(0, 4);
    const end = REACT_APP_JAI_SDK_KEY.substring(28, 32);
    return `${start}***********************${end}`;
  }

  function showEnvironments() {
    return (<ul>
      {environments.map(item => (
        <li key={(item.key || item.id)}>{item.name}</li>
      ))}
    </ul>)
  }

  function executeSimilaritySearch() {
    similaritySearchById("productImages", [10000], 10).then(data => {
      console.log(data);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Your API KEY</p>
        <small>
          {getApiKey()}
        </small>
        <a className="App-link" href="https://getjai.com/" target="_blank" rel="noopener noreferrer">
          More About JAI
        </a>
        <div>

          {showEnvironments()}

          {/* <button onClick={executeSimilaritySearch}>
            Similar By ID
          </button> */}
        </div>

      </header>


    </div>
  );
}

export default App;
