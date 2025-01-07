import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

// Logger konfigurace
const logger = pino(
  {
    level: "info", // Nastavení úrovně logování
    timestamp: pino.stdTimeFunctions.isoTime, // Přizpůsobený časový formát
    base: null, // Odstraní metadata jako `pid`, `hostname`
    messageKey: "msg", // Klíč pro zprávy
    formatters: {
      level: (label) => ({ level: label }), // Zjednodušení úrovně logu
    },
  },
  isProduction
    ? process.stdout // V produkci logy zapisujeme přímo do souboru
    : pino.multistream([
        { stream: pino.destination(logFile) }, // Zapisuje logy do souboru
        { stream: process.stdout }, // Zobrazuje logy v konzoli
      ])
);

export default logger;
