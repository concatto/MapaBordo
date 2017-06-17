import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import { store, history } from './store';
import { Grid, Row, Col } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import routes from './routeConfig';

const withTitle = (Component, title) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title;
    }

    render() {
      return <Component {...this.props}/>;
    }
  };
};

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
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
