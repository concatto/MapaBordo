import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import { Grid, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import routes from './routeConfig';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = routes.map((route) => (
      <Route exact path={route.path} component={route.component} key={route.path}/>
    ));
  }

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
                    {this.routes}
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
