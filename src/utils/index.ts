import * as crypto from 'crypto';

export const md5Password = (password: string) => {
  const hash = crypto.createHash('md5');
  hash.update(password);
  return hash.digest('hex');
};
