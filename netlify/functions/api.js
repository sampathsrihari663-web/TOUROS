const serverless = require('serverless-http');

// In production, Netlify injects env vars directly.
// dotenv is only used for local dev (via netlify dev).
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').join(__dirname, '../../backend/.env') });
}

const app = require('../../backend/app');

module.exports.handler = serverless(app);
