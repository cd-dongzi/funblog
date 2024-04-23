'use strict';

exports.LinkStatus = void 0;
(function (LinkStatus) {
  LinkStatus["APPROVED"] = "approved";
  LinkStatus["PENDING"] = "pending";
  LinkStatus["REJECTED"] = "rejected";
})(exports.LinkStatus || (exports.LinkStatus = {}));
exports.LinkType = void 0;
(function (LinkType) {
  LinkType["PERSONAL_BLOG"] = "personal-Blog";
  LinkType["WEBSITE_COMMUNITY"] = "websiteCommunity";
  LinkType["PERSONAL_ONLINE"] = "personalOnline";
  LinkType["PERSONAL_RECOMMENDATION"] = "personalRecommendation";
  LinkType["RESOURCE_MATERIALS"] = "resourceMaterials";
})(exports.LinkType || (exports.LinkType = {}));
