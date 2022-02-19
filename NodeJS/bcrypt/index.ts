import * as bcrypt from "bcrypt";

const hashString = async (string: string) => {
  const hashedPassword = await bcrypt.hash(string, 10);
  return hashedPassword;
};

const compare = (string: string, hashedString: string) => {
  return new Promise((res, rej) => {
    bcrypt.compare(string, hashedString, async (err, result) => {
      if (err) return rej(err);
      res(result);
    });
  });
};
