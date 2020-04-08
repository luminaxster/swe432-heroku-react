import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
export default function Fetcher(props) {
    const { url } = props;
    let [clicks, setClicks] = useState(0);
    const [response, setResponse] = useState(null);

    useEffect( ()=> {
      const  fetchData= async()=>{
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      }
      fetchData();
    }, [clicks]);

    const doSomething = function (event) {
        console.log(event.currentTarget.getAttribute('data-something'));
        setClicks(clicks + 1);
    }
    return (
        <React.Fragment>
            <p>refresh user data count:{clicks}</p>
            <Skeleton variant="text" />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
            <button onClick={doSomething} data-something="Default">
                Default</button>
            <p>{response? JSON.stringify(response) : 'waiting'}</p>
        </React.Fragment>

    );
}
