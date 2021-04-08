import React, {useMemo, useState, useCallback} from 'react';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Fetcher from './components/Fetcher';
import Hooks, {aFunc} from './components/Hooks';
import ToggleButtons from './components/ToggleButtons';
import PopcornSales from './components/PopcornSales';

export default function App(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeCurrentTab = useCallback(
    (event, newValue) => {
      setCurrentTab(newValue);
    },
    []
  );

  const {rootSX, tabsSX} = useMemo(
    ()=>({
      rootSX:{ flexGrow: 1 },
      tabsSX: { borderBottom: 1, borderColor: 'divider' }
    }),
    []
  );

  return (
    <Box sx={rootSX}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
              SWE 432 React examples
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={tabsSX}>
        <Tabs value={currentTab} onChange={handleChangeCurrentTab}>
          <Tab label="Popcorn Sales" />
          <Tab label="Fetcher" />
          <Tab label="Hooks" />
          <Tab label="Toggle Buttons" />
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        <PopcornSales />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Fetcher />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        {/*careful Icarus*/}
        <Hooks name={aFunc().name} />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <ToggleButtons />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
