module.exports = {
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    code: 0
  },

  EMAIL_IS_NOT_AVAILABLE: {
    message: 'User with this email already registered',
    code: '400.1'
  },

  INVALID_KEY_VALUE: {
    message: 'Invalid key value',
    code: '400.2'
  },

  NO_TOKEN: {
    message: 'No token',
    code: '401.1'
  },

  WRONG_TOKEN: {
    message: 'Wrong token',
    code: '401.2'
  },

  WRONG_TEMPLATE: {
    message: 'Wrong template',
    code: '401.3'
  },

  WRONG_EMAIL_OR_PASSWORD: {
    message: 'Wrong email or password',
    code: '403.1'
  },

  USER_NOT_FOUND: {
    message: 'User not found',
    code: '404.1'
  }

};
