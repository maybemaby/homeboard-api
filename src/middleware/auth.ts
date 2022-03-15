import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUser } from "../models/User";
import UserService from "../services/UserService";

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const data = req.body as IUser;
      UserService.createOne(data)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      UserService.login(username, password)
        .then((res) => {
          if (res.user) {
            return done(null, res.user);
          } else {
            return done(null, null, { message: res.message });
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
