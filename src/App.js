import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './App.css';
import Fetcher from './components/Fetcher';
import Hooks, {aFunc} from './components/Hooks';
import ToggleButtons from './components/ToggleButtons';

const publicURL = 'https://swe432tomcat.herokuapp.com';
export const getLocationUrlData = () => {
  return {
      url:
//           process.env.NODE_ENV === 'production'?
          publicURL
//           :`${window.location.origin}`
,
      hash: `${window.location.hash}`
  };
};
export const servicePath ='/echo';

function App(props) {
  const [weekDay, setWeekDay] = React.useState("Monday");
  return (
    <div style={{flexGrow: 1}}>
      <Grid 
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      spacing={2}
      >
        <Grid item xs>
          <Paper elevation={1}>
            <Hooks name={aFunc().name}/>
            </Paper>
        </Grid>
        <Grid item xs>
          <Paper elevation={1}>
            <Fetcher  value={weekDay} url={`${getLocationUrlData().url}${servicePath}`}/>
            </Paper>
          </Grid>
        <Grid item xs>
          <Paper elevation={1}>
            <ToggleButtons value={weekDay} onChange ={setWeekDay}/>
          </Paper>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
