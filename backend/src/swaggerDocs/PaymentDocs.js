/**
 * @swagger
 * tags:
 *   - name: Payments
 *     description: Operations related to Donations(Payments)
 */

/**
 * @swagger
 * paths:
 *   /payments:
 *     post:
 *       summary: Vytvoření nové platby
 *       description: Vytvoří novou platbu pro konkrétní projekt
 *       tags: [Payment]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Donation'
 *       responses:
 *         201:
 *           description: Platba byla úspěšně vytvořena
 *         400:
 *           description: Chyba validace
 *         401:
 *           description: Neautorizovaný přístup
 *         500:
 *           description: Serverová chyba
 */
/**
 * @swagger
 * paths:
 *   /payments/project/{projectId}:
 *     get:
 *       summary: Získání plateb pro daný projekt
 *       description: Vrací všechny platby pro specifikovaný projekt
 *       tags: [Payment]
 *       parameters:
 *         - name: projectId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *             description: ID projektu, pro který chcete získat platby
 *       responses:
 *         200:
 *           description: Platby nalezeny
 *         400:
 *           description: Chyba validace
 *         404:
 *           description: Žádné platby pro tento projekt
 *         500:
 *           description: Serverová chyba
 */
/**
 * @swagger
 * paths:
 *   /payments/user/{userId}:
 *     get:
 *       summary: Získání plateb pro konkrétního uživatele
 *       description: Vrací všechny platby provedené konkrétním uživatelem
 *       tags: [Payment]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *             description: ID uživatele, jehož platby chcete získat
 *       responses:
 *         200:
 *           description: Platby nalezeny
 *         400:
 *           description: Chyba validace
 *         404:
 *           description: Žádné platby pro tohoto uživatele
 *         500:
 *           description: Serverová chyba
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Donation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unikátní identifikátor platby
 *         user_id:
 *           type: string
 *           description: ID uživatele, který provedl platbu
 *         project_id:
 *           type: string
 *           description: ID projektu, do kterého byla platba provedena
 *         amount:
 *           type: number
 *           description: Výše platby
 *       required:
 *         - user_id
 *         - project_id
 *         - amount
 */
