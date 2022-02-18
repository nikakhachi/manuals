import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const initialize = (passport: PassportStatic, getUserByEmail: (email: string) => any) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      console.log("xd");
      const user = getUserByEmail(email);
      if (user === null) return done(null, false, { message: "User Not Found" });
      try {
        if (await bcrypt.compare(password, user.password)) {
          done(null, user);
        } else {
          return done(null, false, { message: "Password Incorrect" });
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
};

export default initialize;
