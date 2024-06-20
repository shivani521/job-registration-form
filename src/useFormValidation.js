import { useState } from 'react';

const useFormValidation = (validate) => {
  const [errors, setErrors] = useState({});

  const handleValidation = (formData) => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return validationErrors;
  };

  return {
    errors,
    handleValidation,
  };
};

export default useFormValidation;
