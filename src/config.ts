import winston, { Logger } from "winston";

const defaultFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

interface Config {
  loggers: Record<string, Logger>;
}

const config: Config = {
  loggers: {
    requests: winston.createLogger({
      level: "info",
      format: defaultFormat,
    }),
    errors: winston.createLogger({
      level: "error",
      format: defaultFormat,
    }),
    auth: winston.createLogger({
      level: "info",
      format: defaultFormat,
    }),
  },
};

if (process.env.NODE_ENV !== "production") {
  for (const key of Object.keys(config.loggers)) {
    config.loggers[key].add(new winston.transports.Console());
  }
} else if (process.env.NODE_ENV === "production") {
  for (const key of Object.keys(config.loggers)) {
    config.loggers[key].add(
      new winston.transports.File({
        level: config.loggers[key].level,
        filename: `${key}.log`,
        dirname: "logs",
      })
    );
  }
}

export default config;
