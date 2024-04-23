var LinkStatus;
(function (LinkStatus) {
  LinkStatus["APPROVED"] = "approved";
  LinkStatus["PENDING"] = "pending";
  LinkStatus["REJECTED"] = "rejected";
})(LinkStatus || (LinkStatus = {}));
var LinkType;
(function (LinkType) {
  LinkType["PERSONAL_BLOG"] = "personal-Blog";
  LinkType["WEBSITE_COMMUNITY"] = "websiteCommunity";
  LinkType["PERSONAL_ONLINE"] = "personalOnline";
  LinkType["PERSONAL_RECOMMENDATION"] = "personalRecommendation";
  LinkType["RESOURCE_MATERIALS"] = "resourceMaterials";
})(LinkType || (LinkType = {}));

export { LinkStatus, LinkType };
