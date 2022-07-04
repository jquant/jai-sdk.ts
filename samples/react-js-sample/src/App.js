import * as React from "react";
import {useState, useEffect} from "react";

import logo from './logo.png';
import './App.css';
import {authenticate, similaritySearchById, getEnvironments, setEnvironment, getDatabaseInfo} from 'jai-sdk';

const {REACT_APP_JAI_SDK_KEY} = process.env;

function App() {

    const [loaded, setLoaded] = useState(false);
    const [environments, setEnvironments] = useState([]);
    const [collections, setCollections] = useState([]);
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

    }, [REACT_APP_JAI_SDK_KEY]);

    useEffect(() => {

        if (!selectedEnvironment)
            return;

        setEnvironment(selectedEnvironment)

        getDatabaseInfo("names").then(collections => {
            setCollections(collections.sort());
        })

    }, [selectedEnvironment]);

    function getApiKey() {
        if (!REACT_APP_JAI_SDK_KEY)
            return "Please, set the REACT_APP_JAI_SDK_KEY in your env.local file";

        const start = REACT_APP_JAI_SDK_KEY.substring(0, 4);
        const end = REACT_APP_JAI_SDK_KEY.substring(28, 32);
        return `${start}***********************${end}`;
    }

    function showEnvironments() {
        return (
            <select onChange={e => setSelectedEnvironment(e.target.value)}>
                <option>Please, select one</option>
                {environments.map(({key, name}) => (
                    <option key={name} value={(key || name)}>{name}</option>
                ))}
            </select>
        )
    }

    function showCollectionNames() {
        return (
            <select>
                <option>Please, select one</option>
                {collections.map(item => (
                    <option key={item}>{item}</option>
                ))}
            </select>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Your API KEY</p>
                <small>
                    Key: {getApiKey()}
                </small>
                <div>
                    {environments &&
                        <p>
                            Environments: {showEnvironments()}
                        </p>
                    }

                    {collections &&
                        <p>
                            Collections:{showCollectionNames()}
                        </p>
                    }
                </div>

                <a className="App-link" href="https://getjai.com/" target="_blank" rel="noopener noreferrer">
                    More About JAI
                </a>

            </header>
        </div>
    );
}

export default App;
