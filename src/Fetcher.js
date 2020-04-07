import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


export default function Fetcher(props) {
    const { classes, url, options } = props;
    let [clicks, setClicks] = useState(0);
    const [response, setResponse] = useState(null);

    useEffect(async function() {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
    });

    const doSomething = function (event) {
        console.log(event.currentTarget.getAttribute('data-something'));
        setClicks(clicks + 1);
    }
    return (
        <React.Fragment>
            <p>click count:{clicks}</p>
            <button onClick={doSomething} data-something="Default">
                Default</button>
            <p>{response ? 'waiting' : response}</p>
        </React.Fragment>

    );
}
