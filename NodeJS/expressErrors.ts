import * as express from "express";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  throw new ValidationError(404, "Requested item NOT FOUND");
  res.send("Hello World");
});

app.use((req: Request, res: Response) => {
  res.send("Middleware");
});

// Error Handling Middleware
// Automatically comes here if error is thrown
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status).json({ status: err.status, TypeError: err.message });
});

app.listen(5000, () => console.log(`Server started on PORT : 5000`));

class ValidationError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}
