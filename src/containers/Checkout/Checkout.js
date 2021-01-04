import React, {Component} from 'react';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './Contact-data/Contact-data';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component{

componentDidMount(){
  const query = new URLSearchParams(this.props.location.search);
  const ingredients = {};
  let price = 0;
  for(let param of query.entries()){
    if(param[0] === 'price'){
      price = param[1]
    }else{
        ingredients[param[0]] = +param[1] ;
    }

  }
  this.setState({ingredients: ingredients, price: price})
}

checkoutCancelledHandler = () =>{
  this.props.history.goBack();
}

checkoutContinuedHandler = () =>{
  this.props.history.push('/checkout/contact-data')
}
  render(){
    let summary = <Redirect to = '/'/>
    if(this.props.ings){
      const purchaseRedirect = this.props.purchased ? <Redirect to ='/'/>: null;
      summary = (
        <div>
          {purchaseRedirect}
           <CheckoutSummary ingredients = {this.props.ings}
            checkoutCancelled = {this.checkoutCancelledHandler}
            checkoutContinued = {this.checkoutContinuedHandler}/>
            <Route path = {this.props.match.path + '/contact-data'}
            component = {ContactData}/>
        </div>
     )
    }
    return summary
  }
}

const mapStateToProps = state =>{
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);
