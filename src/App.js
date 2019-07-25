import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MessageList from './Message/MessageList';
import MessageInput from './Message/MessageInput';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() =>
          <div>
            <MessageList />
            <MessageInput />
          </div>
        } />
      </Switch>
    </div>
  );
}

export default App;
