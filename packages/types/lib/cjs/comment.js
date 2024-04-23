'use strict';

exports.CommentStatus = void 0;
(function (CommentStatus) {
  CommentStatus["APPROVED"] = "approved";
  CommentStatus["PENDING"] = "pending";
  CommentStatus["SPAM"] = "spam";
})(exports.CommentStatus || (exports.CommentStatus = {}));
exports.CommentType = void 0;
(function (CommentType) {
  CommentType["POST"] = "post";
  CommentType["PAGE"] = "page";
  CommentType["MESSAGE_BOARD"] = "message_board";
})(exports.CommentType || (exports.CommentType = {}));
