export const validateForm = (formValue) => {
  const errors = {};

  if (!formValue.name) {
    errors.name = 'Name is required';
  }

  const errorsValuesArray = Object.values(errors);

  return {
    errors,
    isFormValid: errorsValuesArray.every((el) => el === ''),
  };
};
