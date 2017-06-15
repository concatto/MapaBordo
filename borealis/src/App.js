import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <NavigationBar/>

            <div className="main">
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
