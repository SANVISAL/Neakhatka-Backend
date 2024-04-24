import crypto from 'crypto';

function generateToken(): string {
  return crypto.randomBytes(20).toString('hex');
}

export {generateToken}