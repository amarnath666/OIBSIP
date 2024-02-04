import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  // Create a payload containing user ID and role
  const payload = { userId, role };

  // Set options for the JWT, including expiration (14 days)
  const options = { expiresIn: '14d' }; 

  // Sign the JWT with the payload, secret, and options
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default generateToken;


