import React, { Component } from 'react'
import './App.css'
import TopNav from './components/TopNav'
import UploadCards from './pages/UploadCards'
import SearchResults from './pages/SearchResults'
import Page404 from './pages/Page404'
import { Route, Switch } from "react-router-dom"
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);


class App extends Component {

  render() {

    return (
      <div className="App">
        <TopNav />
        <Switch>
          <Route exact path='/' component={UploadCards} />
          <Route path='/search' component={SearchResults} />
          <Route component={Page404} />
        </Switch>
      </div>
    );
  }
}

export default App;
