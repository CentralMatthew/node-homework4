const {
  emailActionEnum: {
    WELCOME, PASSWORD_WAS_CHANGED, REGISTRATION, UPDATE, DELETE
  }
} = require('../constants');

module.exports = {
  [WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on table'
  },
  [PASSWORD_WAS_CHANGED]: {
    templateName: 'changedPassword',
    subject: 'Password was successful changed'
  },
  [REGISTRATION]: {
    templateName: 'registration',
    subject: 'You are was successful register'
  },
  [UPDATE]: {
    templateName: 'updateInfo',
    subject: 'You are was successful update info'
  },
  [DELETE]: {
    templateName: 'deleteUser',
    subject: 'You are was delete account'
  }
};
