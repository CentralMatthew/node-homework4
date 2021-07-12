const util = require('util');
const jwt = require('jsonwebtoken');

const verifyPromisify = util.promisify(jwt.verify);

const {
  tokensConstant: {
    ACCESS, ACCESS_TOKEN, EXPIRES_FOR_ACCESS, EXPIRES_FOR_REFRESH, REFRESH_TOKEN
  },
} = require('../constants');

module.exports = {
  generateTokenPair: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN, { expiresIn: EXPIRES_FOR_ACCESS });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN, { expiresIn: EXPIRES_FOR_REFRESH });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    const secretWord = tokenType === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN;

    const verify = await verifyPromisify(token, secretWord);

    console.log(verify);
  }

};
