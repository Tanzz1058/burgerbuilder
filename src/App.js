import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render(){
    let routes = (
      <Switch>
        <Route path = '/auth' component = {Auth}/>
        <Route path = '/' component = {BurgerBuilder}/>
        <Redirect to = '/'/>
      </Switch>
    )
    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path = '/checkout' component = {Checkout}/>
          <Route path = '/orders' component = {Orders}/>
          <Route path = '/logout' component = {Logout}/>
          <Route path = '/auth' component = {Auth}/>
          <Route path = '/' component = {BurgerBuilder}/>
        </Switch>
      )
    }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.checkAuthStatus())
  }
}
const mapStateToProps = state =>{
  return{
    isAuth: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
