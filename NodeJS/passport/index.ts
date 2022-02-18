import express, { Request, Response, Application } from "express";
import passport from "passport";
import initializePassport from "./passportConfig";
import flash from "express-flash";
import session from "express-session";
const app: Application = express();

const users = [];

app.use(flash());
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport, (email) => users.find((item) => item.email === email));

app.post("/login", passport.authenticate("local"), (req: Request, res: Response) => res.send("DONE"));

app.listen(5000, () => console.log(`Running`));
