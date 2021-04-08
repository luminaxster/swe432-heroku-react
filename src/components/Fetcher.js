import React, { useState, useEffect, useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/core/Skeleton';

const publicURL = 'https://swe432tomcat.herokuapp.com';
const getLocationUrlData = () => {
  return {
      url:publicURL,
      hash: `${window.location.hash}`
  };
};

const servicePath ='/echo';

function Fetcher(props) {
    const { url, value} = props;
    const [clicks, setClicks] = useState(0);
    const [response, setResponse] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const body = `input=${inputValue}&value=${value}`;

    const  fetchData= useCallback(async()=>{
      const res = await fetch(url,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          //redirect: 'follow', // manual, *follow, error
          //referrerPolicy: 'no-referrer', // no-referrer, *client
          body  // body data type must match "Content-Type" header
        }
      );
      const json = await res.json();
      setResponse(json);
    },
     [url, body]
   );

    useEffect( ()=> {
      setResponse(null);
      fetchData().catch(e=>{console.log(e)});
    }, [fetchData]);

    const doSomething = function (event) {
        console.log(event.currentTarget.getAttribute('data-something'));
        setClicks(clicks + 1);
    }
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };


    return (
        <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        >
          <Grid item xs>
            <Typography variant="h6">submits: {clicks}</Typography>
          </Grid>
            <Grid item xs>
              <TextField
              label="Type something"
              helperText="This will be echo echo by the server"
              value={inputValue} onChange={handleChange} />
            </Grid>
            <Grid item xs>
              <Button onClick={doSomething} variant="contained" color="primary" data-something="submit">
                  submit</Button>
            </Grid>
            <Grid item xs>
              <Paper elevation={1} style={
                {height:200, width:200, wordBreak: "break-all", padding:4}
              } >
                {response?JSON.stringify(response):
                (<React.Fragment>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={200} height={118} />
                </React.Fragment>)}
                </Paper>
              </Grid>
        </Grid>

    );
}


export default function FetcherControlled(props) {
  const url = `${getLocationUrlData().url}${servicePath}`;
  
  return  <Fetcher value={"someValue"} url={url}/>;
}
