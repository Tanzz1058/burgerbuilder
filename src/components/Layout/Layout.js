import React,{ Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
  state = {
    showSideDrawer: false
  }
  drawerToggleClicked = () =>{
    this.setState(
      (prevState) =>{
        return{
          showSideDrawer: !prevState.showSideDrawer
        }
      }
  )
  }


  render(){
    return(
    <Aux>
        <div>
          <Toolbar isAuth = {this.props.isAuth} clicked = {this.drawerToggleClicked}/>
          <SideDrawer
            isAuth = {this.props.isAuth}
            open = {this.state.showSideDrawer}
          closed = {this.drawerToggleClicked}
         />
        </div>
        <main className = {classes.Content}>
          {this.props.children}
        </main>
    </Aux>
  )
  }
}

const mapStateToProps = state =>{
  return{
    isAuth: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
