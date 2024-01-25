// jwtUtils.js

import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const options = { expiresIn: '14d' }; // Set an appropriate expiration time

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default generateToken;


