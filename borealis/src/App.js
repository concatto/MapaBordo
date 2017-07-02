import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import { Grid, Row, Col } from 'react-bootstrap';
import { withTitle } from './utils';
import NavigationBar from './components/NavigationBar';
import Notifications from 'react-notification-system-redux';
import routes from './routeConfig';

let NotificationRoot = ({notifications}) => (
  <Notifications notifications={notifications}/>
);

NotificationRoot = connect((state) => ({
  notifications: state.notifications
}))(NotificationRoot);


class App extends Component {
  constructor(props) {
    super(props);

    this.routes = routes.map((route) => (
      <Route exact
        path={route.path}
        component={withTitle(route.component, route.title)}
        key={route.path}
      />
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

            <NotificationRoot/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
