/* eslint-disable default-case */
import { useState } from 'react';

export function useFormWithValidation(){
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const nameTemplate = /^[a-zA-ZА-Яа-я\-\s]+$/;
        const emailTemplate = /^[^ ]+@[^ ]+\.[a-z]{1,3}$/;

        setValues({...values, [name]: value});

        setErrors({...errors, [name]: target.validationMessage });
        
        setIsValid(target.closest("form").checkValidity());
      
        // switch(name) {
        //   case 'name': nameTemplate.test(value) ?  delete errors.name : setErrors({...errors, [name]: 'только латиница,кириллица,пробел или дефис',});
        //     break;
        //   case 'email': emailTemplate.test(value) ? delete errors.email : setErrors({ ...errors, [name]: 'Введен невалидный Email' });
        //     break;
        //   case 'password': setErrors({ ...errors, [name]: target.validationMessage });
        //     break;
        switch(name) {
          case 'name': nameTemplate.test(value) ?  setErrors({ ...errors, [name]: target.validationMessage }) : setErrors({...errors, [name]: 'только латиница,кириллица,пробел или дефис'});
            break;
          case 'email': emailTemplate.test(value) ? setErrors({ ...errors, [name]: target.validationMessage }) : setErrors({ ...errors, [name]: 'Введите Email' });
            break;
          case 'password': setErrors({ ...errors, [name]: target.validationMessage });
            break;
        
      };

    }
  
      return { values, handleChange, errors, isValid };
    }