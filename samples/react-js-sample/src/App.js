import logo from './logo.png';
import './App.css';
import { authenticate } from 'jai-sdk';

const { REACT_APP_JAI_SDK_KEY } = process.env;

function App() {

  function getApiKey() {
    if (!REACT_APP_JAI_SDK_KEY)
      return "Please, set the REACT_APP_JAI_SDK_KEY in your env.local file";

    const start = REACT_APP_JAI_SDK_KEY.substring(0, 4);
    const end = REACT_APP_JAI_SDK_KEY.substring(28, 32);
    return `${start}***********************${end}`;
  }


  function executeSimilaritySearch() {
    authenticate(REACT_APP_JAI_SDK_KEY);
    // similaritySearchById("productImages", [10000], 10).then(data => {
    //   console.log(data);
    // })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>          Your API KEY        </p>
        <small>
          {getApiKey()}
        </small>
        <a className="App-link" href="https://getjai.com/" target="_blank" rel="noopener noreferrer"        >
          More About JAI
        </a>

        <div>
          <button onClick={executeSimilaritySearch()}>
            Similar By ID
          </button>
        </div>

      </header>


    </div>
  );
}

export default App;
