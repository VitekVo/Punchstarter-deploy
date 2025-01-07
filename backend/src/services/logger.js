import pino from "pino";
import pinoPretty from "pino-pretty";

const isProduction = process.env.NODE_ENV === "production";

// Nastavení výstupu pro různé prostředí
const logDestination = pinoPretty(); // Čitelné logy pro vývoj

const logger = pino(
  {
    level: "info",
  },
  logDestination
);

export default logger;
