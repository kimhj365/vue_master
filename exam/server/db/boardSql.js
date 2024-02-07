// boardSql.js
// 조회(전체)
let boardList = 
`SELECT no
        , title
        , writer
        , content
        , created_date
        , updated_date
FROM t_board_board
ORDER BY 1`;

// 조회(단건)
let boardInfo = 
`SELECT no
        , title
        , writer
        , content
        , created_date
        , updated_date
FROM t_board_board
WHERE no = ?`;

// 등록
let boardInsert = 
`INSERT INTO t_board_board
SET ?`; 

// 수정1
let boardUpdateAll = 
`UPDATE t_board_board
SET ?
WHERE no = ?`;  // 배열[ 객체, 단일값 ]

// 수정2
// 특정 대상 명시하는 경우
let boardUpdateInfo = 
`UPDATE t_board_board
SET title = ?, content = ?, updated_date = ?
WHERE no = ?`;  // 배열[ 단일값, 단일값, 단일값, 단일값 ]

// 삭제
let boardDelete = 
`DELETE FROM t_board_board
WHERE no = ?;`

// 댓글 조회
let commentList = 
`SELECT no
        , writer
        , content
        , created_date
        , updated_date
        , bno
FROM t_comment_board
WHERE bno = ?
ORDER BY 1`;

// 댓글 수
let commentCount = 
`SELECT count(*)
FROM    t_comment_board
WHERE   bno = ?`;


module.exports = {
    boardList,  // 변수명  == 필드명, 변수가 가지고 있는 값이 필드의 값
    boardInfo,
    boardInsert,
    boardUpdateAll,
    boardUpdateInfo,
    boardDelete,
    commentList,
    commentCount
}