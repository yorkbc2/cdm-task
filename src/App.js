import React, { Component } from 'react';
import { Header, Container, Divider } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Home, Single } from "./pages";
import { Provider } from "react-redux";
import store from "./store";
import { initStart, initEnd } from "./store/actions/houseActions";
import Store from "store";
import CreateHouseModal from "./components/CreateHouseModal/CreateHouseModal";
 
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpened: false
    }
  }
  componentDidMount() {
    store.dispatch(initStart());
    let data = Store.get('houses');
    setTimeout(() => {
      
      if (!data) {
        data = [];
        Store.set("houses", []);
      }
      
      store.dispatch(initEnd(data));
    }, 2000);
  }

  toggleModal() {
    this.setState(state => ({...state, isModalOpened: !state.isModalOpened}));
  }

  render() {
    return (
      <div className="App">
        
        <Provider store={store}>
          <Container>
            <Header as="h1">
              HouseRepair <CreateHouseModal />
            </Header>
            <Divider />
            <Router>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/house/:uid" component={Single} />
              </Switch>
            </Router>
            {this.state.isModalOpened ? (<CreateHouseModal />) : null}
          </Container>
        </Provider>

      </div>
    );
  }
}

export default App;
