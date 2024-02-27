const commentList = 
`SELECT no
        , writer
        , content
        , created_date
FROM    t_comment_board
WHERE   bno = ?
ORDER BY no`;

module.exports = {
  commentList
}