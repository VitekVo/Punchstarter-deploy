## Jak spustit backend

1. **Naklonovat git repozitář**  
   Naklonujte repozitář pomocí příkazu:  
   ```bash
   git clone <URL-repozitáře>
   cd <název-projektového-folderu>
   ```

2. **Stažení `.env` souboru**  
   Stáhněte si aktuální `.env` soubor z Discordu a vložte jej do root složky projektu.

3. **Instalace závislostí**  
   Zadejte následující příkaz do terminálu pro stažení chybějících balíčků:  
   ```bash
   npm install
   ```

4. **Spuštění serveru**  
   Ve složce obsahující soubor `server.js` spusťte server příkazem:  
   ```bash
   node server.js
   ```

5. **Swagger dokumentace**  
   Dostupné endpointy naleznete na adrese:  
   ```
   http://localhost:<PORT>/api-docs
   ```
   (Nahraďte `<PORT>` číslem portu uvedeným v `.env` souboru nebo výchozí hodnotou `3000`.)
