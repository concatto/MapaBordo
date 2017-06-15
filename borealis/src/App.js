import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import { Grid, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import InsertRoot from './components/InsertRoot';
import QueryRoot from './components/QueryRoot';
import SummariesRoot from './components/SummariesRoot';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <NavigationBar/>

            <Grid className="main">
              <Row>
                <Col xs={10} xsOffset={1}>
                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/cadastrar" component={InsertRoot}/>
                    <Route exact path="/visualizar" component={QueryRoot}/>
                    <Route exact path="/relatorios" component={SummariesRoot}/>
                    <Route exact path="/sobre" component={About}/>
                  </Switch>
                </Col>
              </Row>
            </Grid>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
