// Ensure webcrypto / crypto is available on global scope for all Node versions
const nodeCrypto = require('crypto');
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = nodeCrypto.webcrypto || nodeCrypto;
}
if (typeof global.crypto === 'undefined') {
  global.crypto = globalThis.crypto;
}

const serverless = require('serverless-http');

// In production, Netlify injects env vars directly.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').join(__dirname, '../../backend/.env') });
}

const app = require('../../backend/app');

module.exports.handler = serverless(app);
