import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact-data.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Address'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your ZIP Code'
          },
          value: '',
          validation: {
            required: true,
            isNumeric: true,
            minLength: 6,
            maxLength: 6
          },
          valid: false,
          touched: false
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false
        }
      ,
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
         value: 'fastest',
         validation: {},
         valid: true,
         touched: false
        },
  },
  loading: false,
  formIsValid: false
}

  orderHandler = (event) =>{
    event.preventDefault();
     this.setState({loading: true});
     const formData = {};
     for(let formDataIdentifier in this.state.orderForm){
       formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
     }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);
}

inputChangedHandler = (event, inputIdentifier) =>{
  
  const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],
    {value:event.target.value,
    valid: checkValidity( this.state.orderForm[inputIdentifier].validation, event.target.value ),
    touched: true});

    const updatedForm = updateObject(this.state.orderForm,
      {
        [inputIdentifier]: updatedFormElement
      });
    
  let formIsValid = true;
  for(let inputIdentifiers in updatedForm){
    formIsValid = updatedForm[inputIdentifiers].valid && formIsValid
  }
  this.setState({orderForm: updatedForm, formIsValid: formIsValid});

}

  render(){
    const formElementsArray = [];

    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit = {this.orderHandler}>
          {formElementsArray.map(formElement =>(
            <Input
            key = {formElement.id}
            elementType = {formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            invalid = {!formElement.config.valid}
            changed = {(event) =>this.inputChangedHandler(event, formElement.id)}
            touched = {formElement.config.touched}
            shouldValidate = {formElement.config.validation}/>
          ))}
          <Button btnType = 'Success' disabled ={!this.state.formIsValid}>ORDER</Button>
       </form>
      );
    if(this.props.loading){
      form = <Spinner/>
    }
    return(
      <div className = {classes.ContactData}>
        <h1>Enter your contact data</h1>
           {form}
     </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));