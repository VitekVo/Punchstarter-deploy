/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations related to users.
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Create a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: User login
 *     description: Logs in a user with username and password, returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     description: Fetch user details by user ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch
 *         schema:
 *           type: string
 *           example: 60f7d5f5f5d4f5b8b8f8f8f8
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags: [Users]
 *     summary: Update user details
 *     description: Update user details such as username or password.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *           example: 60f7d5f5f5d4f5b8b8f8f8f8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johnnydoe
 *               password:
 *                 type: string
 *                 example: newsecret123
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     description: Delete a user by their user ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *           example: 60f7d5f5f5d4f5b8b8f8f8f8
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted
 *                 deletedAt:
 *                   type: string
 *                   example: 2024-12-06T12:00:00.000Z
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/follow:
 *   post:
 *     tags: [Users]
 *     summary: Follow a project
 *     description: Adds a project to the user's follow list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60f7d5f5f5d4f5b8b8f8f8f8
 *               projectId:
 *                 type: string
 *                 example: 60f7d5f5f5d4f5b8b8f8f8f8
 *     responses:
 *       200:
 *         description: User is following the project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is now following the project
 *                 followedAt:
 *                   type: string
 *                   example: 2024-12-06T12:00:00.000Z
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User or project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         followingProjects:
 *           type: array
 *           items:
 *             type: string
 *         contributions:
 *           type: array
 *           items:
 *             type: string
 */

