var CommentStatus;
(function (CommentStatus) {
  CommentStatus["APPROVED"] = "approved";
  CommentStatus["PENDING"] = "pending";
  CommentStatus["SPAM"] = "spam";
})(CommentStatus || (CommentStatus = {}));
var CommentType;
(function (CommentType) {
  CommentType["POST"] = "post";
  CommentType["PAGE"] = "page";
  CommentType["MESSAGE_BOARD"] = "message_board";
})(CommentType || (CommentType = {}));

export { CommentStatus, CommentType };
