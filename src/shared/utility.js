export const updateObject = (oldObject, updatedObject) =>{
    return{
        ...oldObject,
        ...updatedObject
    }
}

export const checkValidity = (value, rules) =>{
    let isValid = true;

    if(value.required){
      isValid && (isValid = rules.trim() !== '') ;
    }
    if(value.minLength){
      isValid && (isValid = rules.length >= value.minLength) ;
    }
    if(value.maxLength){
      isValid && (isValid = rules.length <= value.maxLength) ;
    }
    if(value.isEmail){
      isValid && (isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(rules));
    }
    if(value.isNumeric){
      isValid && (isValid = !isNaN(rules));
    }
    return isValid;
  }