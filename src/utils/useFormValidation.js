/* eslint-disable default-case */

import { useEffect } from "react";
import { useState } from "react";

function useValidation(value, validation) {
  const [inputError, setInputError] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);


  useEffect(() => {
    for (const validate in validation) {
      switch (validate) {
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;

        case "pattern":
          !new RegExp(validation[validate]).test(value)
            ? setInputError({
                ...inputError,
                [validate]: `только латиница,кириллица,пробел или дефис`,
              })
            : delete inputError[validate];
          break;

        // case "minLength":
        //   value.length < validation[validate]
        //     ? setInputError({
        //         ...inputError,
        //         [validate]: `Минимум ${validation[validate]} символа`,
        //       })
        //     : delete inputError[validate];
        //   break;
          
        // case "maxLength":
        //   value.length >= validation[validate]
        //     ? setInputError({
        //         ...inputError,
        //         [validate]: `Максимум ${validation[validate]} символов`,
        //       })
        //     : delete inputError[validate];
        //   break;
          case "isEmail":
            !new RegExp(validation[validate]).test(value)
              ? setInputError({
                  ...inputError,
                  [validate]: `Введен неверный Email`,
                })
              : delete inputError[validate];
            break;
      }
    }

  }, [value]);

  return {

    isEmpty,
    inputError,
  };
}

function useInput(validation) {
  const [value, setValue] = useState("");
  const valid = useValidation(value, validation);

  function onChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange,
    ...valid,
  };
}

export default useInput;
