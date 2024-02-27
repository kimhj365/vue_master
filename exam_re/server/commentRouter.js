const express = require('express');
const commentRouter = express.Router();
const db = require("./db.js");

// 댓글조회
commentRouter.get("/", async (request, response) => {
  let data = request.query.bno; // querystring
  let result = await db.connection('comment','commentList', data);
  response.send(result);
});

module.exports = commentRouter;