import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app: Application = express();

// always configure cors when credentials from client request
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

// example request from client
// axios.post(url, data, { withCredentials: true });
app.get("/", function (req: Request, res: Response) {
  console.log(req.cookies);
  res.cookie("name", "express", {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  res.send("Cookie Set");
});

app.listen(5000, () => console.log(`Running`));
