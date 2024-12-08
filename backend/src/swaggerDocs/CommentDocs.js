/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Operations related to comments.
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment
 *     description: Adds a comment to a project by a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This project looks amazing!"
 *               projectId:
 *                 type: string
 *                 example: "60d7e5e4f5d6a6f8b9d6e5c5"
 *               userId:
 *                 type: string
 *                 example: "60f7d6e7f5d4f5a8b8d6d7f8"
 *     responses:
 *       201:
 *         description: Comment created and added to project successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment created and added to project successfully."
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     description: Deletes a comment by its ID.
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *           example: "60f7d6e7f5d4f5a8b8d6d7f8"
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Comment deleted successfully"
 *                 deletedAt:
 *                   type: string
 *                   example: "2024-12-06T12:00:00.000Z"
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments by project ID
 *     description: Retrieves all comments for a specific project.
 *     parameters:
 *       - name: projectId
 *         in: query
 *         required: true
 *         description: The ID of the project to fetch comments for
 *         schema:
 *           type: string
 *           example: "60d7e5e4f5d6a6f8b9d6e5c5"
 *     responses:
 *       200:
 *         description: List of comments for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments found for this project
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment
 *     description: Updates a comment by its ID.
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment to update
 *         schema:
 *           type: string
 *           example: "60f7d6e7f5d4f5a8b8d6d7f8"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated comment text!"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60f7d6e7f5d4f5a8b8d6d7f8"
 *         text:
 *           type: string
 *           example: "Great project!"
 *         projectId:
 *           type: string
 *           example: "60d7e5e4f5d6a6f8b9d6e5c5"
 *         userId:
 *           type: string
 *           example: "60f7d6e7f5d4f5a8b8d6d7f8"
 *         createdAt:
 *           type: string
 *           example: "2024-12-06T11:00:00.000Z"
 */
