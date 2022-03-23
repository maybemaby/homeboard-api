import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { IUser } from "../models/User";
import UserService from "../services/UserService";
import { JWT_SECRET } from "../index";

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
          if ((err as Error).message) {
            return done(err, false, { message: "Username already in use" });
          } else {
            return done(err);
          }
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

passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: "https://homeboard.com",
    },
    (token: { user: IUser }, done) => {
      try {
        UserService.getById(token.user.id)
          .then((user) => {
            if (user) {
              return done(null, token.user);
            } else {
              return done(new Error("User not found"), false, {
                message: "User not found",
              });
            }
          })
          .catch((err) => done(err));
      } catch (err) {
        done(err);
      }
    }
  )
);
