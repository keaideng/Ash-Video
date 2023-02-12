"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Math) {
  Search();
}
const Search = () => "../../components/Search/index.js";
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    common_vendor.onLoad((message) => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/applet/pages/classify/classify.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
