import React from 'react';
import classes from './Input.module.css';

const input = (props)=>{
  let inputElement = null;
  let errormessage = null;
  const inputClasses  = [classes.InputElement];
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    errormessage = <p style = {{color: 'red'}}>Please enter a valid value!</p>
  }

  switch(props.elementType){
    case('input'):
    inputElement = <input className = {inputClasses.join(' ')}
     {...props.elementConfig}
    value = {props.value}
    onChange = {props.changed}/>
    break;

    case('textarea'):
    inputElement = <textarea className = {inputClasses.join(' ')}
    {...props.elementConfig}
    value = {props.value}
    onChange = {props.changed}/>
    break;

    case('select'):
    inputElement = (<select
    className = {inputClasses.join(' ')}
    {...props.elementConfig}
    value = {props.value}
    onChange = {props.changed}>
    {props.elementConfig.options.map(option =>(
      <option key = {option.value} value = {option.value}>{option.displayValue}</option>
)
    )}
    </select>)
    break;

    default:
    inputElement = <input className = {classes.InputElement}
     {...props.elementConfig}
    value = {props.value}
    onChange = {props.changed}/>
    break;
  }

  return(
    <div className = {classes.Input}>
      <label className = {classes.Label}>{props.label}</label>
      {inputElement}
      {errormessage}
    </div>
  )
}

export default input;
