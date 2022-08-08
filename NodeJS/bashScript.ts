import { exec } from "child_process";

export default (script: string) => {
  return new Promise((res, rej) => {
    exec(script, (error: any, stdout: any, stderr: any) => {
      if (error) {
        return rej({ stderr, error });
      }
      res(stdout);
    });
  });
};
