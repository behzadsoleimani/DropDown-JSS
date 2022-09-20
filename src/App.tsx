import React from 'react';
import { createUseStyles } from 'react-jss'
import DropDown from './components/dropdown';


const useStyles = createUseStyles({
  app: {
    textAlign: 'center',
  }
});

function App() {
  

  const classes = useStyles()

  
  return (
    <main className={classes.app}>
      <DropDown />
    </main>
  );
}

export default App;
