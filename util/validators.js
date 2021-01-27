module.exports.validateRegisterUser = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Empty username";
  }
  if (email.trim() === "") {
    errors.email = "Empty email";
  } else {
    const regEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.match(regEx)) {
      errors.email = "Must be valid email";
    }
  }
  if (password.trim() === "") {
    errors.password = "Empty password";
  } else {
    if (password != confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length == 0,
  };
};

module.exports.validateUserLogin = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Empty username";
  }
  if (password.trim() === "") {
    errors.password = "Empty password";
  }
  return {
    errors,
    valid: Object.keys(errors).length == 0,
  };
};
