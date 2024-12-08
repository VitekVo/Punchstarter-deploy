/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Operations related to projects.
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Vytvoření nového projektu
 *     description: Vytvoří nový projekt s daty poskytnutými v těle požadavku.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - goalAmount
 *               - deadline
 *               - creatorId
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Můj nový projekt"
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *                 example: "Toto je podrobný popis projektu."
 *               goalAmount:
 *                 type: number
 *                 minimum: 1000
 *                 maximum: 10000000
 *                 example: 5000
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *               creatorId:
 *                 type: string
 *                 pattern: "^[a-f\\d]{24}$"
 *                 example: "603d2f0a2f4f560016f2d156"
 *               category:
 *                 type: string
 *                 example: "Technologie"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 example: ["binary data 1", "binary data 2"]
 *               sum:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Projekt úspěšně vytvořen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "603d2f0a2f4f560016f2d156"
 *                     title:
 *                       type: string
 *                       example: "Projekt A"
 *                     description:
 *                       type: string
 *                       example: "Popis projektu A"
 *       400:
 *         description: Neplatné údaje
 *       500:
 *         description: Chyba serveru
 *
 *   get:
 *     summary: Získání projektů podle limitu
 *     description: Vrátí seznam projektů podle daného limitu.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *           example: 10
 *     responses:
 *       200:
 *         description: Projekty nalezeny
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "3 project(s) found."
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "603d2f0a2f4f560016f2d156"
 *                       title:
 *                         type: string
 *                         example: "Projekt A"
 *                       description:
 *                         type: string
 *                         example: "Popis projektu A"
 *                       goalAmount:
 *                         type: number
 *                         example: 5000
 *                       sum:
 *                         type: number
 *                         example: 100
 *                       deadline:
 *                         type: string
 *                         format: date
 *                         example: "2024-12-31"
 *                       creatorId:
 *                         type: string
 *                         example: "603d2f0a2f4f560016f2d156"
 *                       category:
 *                         type: string
 *                         example: "Technologie"
 *       400:
 *         description: Neplatné údaje
 *       404:
 *         description: Žádné projekty nenalezeny
 *       500:
 *         description: Chyba serveru
 *
 * /api/projects/{id}:
 *   get:
 *     summary: Získání projektu podle ID
 *     description: Vrátí detail projektu na základě poskytnutého ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[a-f\\d]{24}$"
 *         example: "603d2f0a2f4f560016f2d156"
 *     responses:
 *       200:
 *         description: Projekt nalezen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "603d2f0a2f4f560016f2d156"
 *                 title:
 *                   type: string
 *                   example: "Projekt A"
 *                 description:
 *                   type: string
 *                   example: "Popis projektu A"
 *                 goalAmount:
 *                   type: number
 *                   example: 5000
 *                 sum:
 *                   type: number
 *                   example: 100
 *                 deadline:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *                 creatorId:
 *                   type: string
 *                   example: "603d2f0a2f4f560016f2d156"
 *                 category:
 *                   type: string
 *                   example: "Technologie"
 *       404:
 *         description: Projekt nenalezen
 *       500:
 *         description: Chyba serveru
 *
 *   put:
 *     summary: Aktualizace projektu podle ID
 *     description: Upraví informace o projektu na základě poskytnutého ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[a-f\\d]{24}$"
 *         example: "603d2f0a2f4f560016f2d156"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Aktualizovaný název"
 *               description:
 *                 type: string
 *                 example: "Aktualizovaný popis"
 *               goalAmount:
 *                 type: number
 *                 example: 8000
 *               sum:
 *                 type: number
 *                 example: 200
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               category:
 *                 type: string
 *                 example: "Zábava"
 *     responses:
 *       200:
 *         description: Projekt úspěšně aktualizován
 *       400:
 *         description: Neplatné údaje
 *       404:
 *         description: Projekt nenalezen
 *       500:
 *         description: Chyba serveru
 *
 *   delete:
 *     summary: Smazání projektu podle ID
 *     description: Odstraní projekt na základě poskytnutého ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[a-f\\d]{24}$"
 *         example: "603d2f0a2f4f560016f2d156"
 *     responses:
 *       200:
 *         description: Projekt úspěšně smazán
 *       404:
 *         description: Projekt nenalezen
 *       500:
 *         description: Chyba serveru
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unikátní identifikátor projektu
 *         creatorId:
 *           type: string
 *           description: ID uživatele, který vytvořil projekt
 *         title:
 *           type: string
 *           description: Název projektu
 *         category:
 *           type: string
 *           enum: ["Tech", "Art", "Film", "Music", "Food", "Game", "Other"]
 *           description: Kategorie projektu
 *         followCount:
 *           type: number
 *           default: 0
 *           description: Počet lidí, kteří sledují tento projekt
 *         followList:
 *           type: array
 *           items:
 *             type: string
 *           description: Seznam uživatelů sledujících tento projekt
 *         description:
 *           type: string
 *           description: Popis projektu
 *         created_at:
 *           type: string
 *           format: date-time
 *           default: Date.now
 *           description: Datum vytvoření projektu
 *         deadline:
 *           type: string
 *           format: date
 *           description: Termín dokončení projektu
 *         goalAmount:
 *           type: number
 *           description: Cílová částka pro projekt
 *         sum:
 *           type: number
 *           default: 0
 *           description: Aktuální suma vybraná na projekt
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Obrázky projektu
 *       required:
 *         - creatorId
 *         - title
 *         - deadline
 *         - goalAmount
 */
