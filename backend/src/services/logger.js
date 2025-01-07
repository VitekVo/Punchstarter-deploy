import pino from 'pino';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Vytvoření __dirname v ES modulech
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cesta ke složce "logs" a log souboru
const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'app.log');

// Vytvoření složky "logs", pokud neexistuje
if (!existsSync(logDir)) {
    mkdirSync(logDir);
}

// Rozlišení prostředí
const isProduction = process.env.NODE_ENV === 'production';

// Logger konfigurace
const logger = pino(
    {
        level: 'info', // Nastavení úrovně logování
        timestamp: pino.stdTimeFunctions.isoTime, // Přizpůsobený časový formát
        base: null, // Odstraní metadata jako `pid`, `hostname`
        messageKey: 'msg', // Klíč pro zprávy
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
