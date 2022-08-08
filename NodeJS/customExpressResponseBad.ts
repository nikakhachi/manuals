import express, { Response, Request, NextFunction } from "express";
const app = express();

const customizeResponse = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  // @ts-ignore: Unreachable code error
  res.send = function () {
    arguments[0] = modifyData(arguments[0], res);
    originalSend.apply(res, arguments);
  };
  next();
};

const modifyData = (originalData, res: Response) => {
  const data = {
    // @ts-ignore: Unreachable code error
    code: res.req.client._httpMessage.statusCode,
    method: res.req.method,
    data: JSON.parse(originalData),
  };
  return JSON.stringify(data);
};

app.use(customizeResponse);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ users: ["user1", "user2"] });
});

app.listen(5000);
