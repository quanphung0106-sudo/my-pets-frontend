export const messages = {
  email: "Invalid email format",
  notMatchPassword: "Retype password doesn't match",
  requiredField: (value) => `${value} is required`,
  maxLength: (field, value) => `${field} max length is ${value}`,
  minLength: (field, value) => `${field} min length is ${value}`,
  min: (field, value) => `${field} must have at least ${value} items`,
};
