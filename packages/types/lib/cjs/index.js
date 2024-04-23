'use strict';

var comment = require('./comment.js');
var page = require('./page.js');
var link = require('./link.js');
var svg = require('./svg.js');



Object.defineProperty(exports, "CommentStatus", {
  enumerable: true,
  get: function () { return comment.CommentStatus; }
});
Object.defineProperty(exports, "CommentType", {
  enumerable: true,
  get: function () { return comment.CommentType; }
});
Object.defineProperty(exports, "PageMenuButtonType", {
  enumerable: true,
  get: function () { return page.PageMenuButtonType; }
});
Object.defineProperty(exports, "PageMenuType", {
  enumerable: true,
  get: function () { return page.PageMenuType; }
});
Object.defineProperty(exports, "LinkStatus", {
  enumerable: true,
  get: function () { return link.LinkStatus; }
});
Object.defineProperty(exports, "LinkType", {
  enumerable: true,
  get: function () { return link.LinkType; }
});
Object.defineProperty(exports, "SvgScope", {
  enumerable: true,
  get: function () { return svg.SvgScope; }
});
