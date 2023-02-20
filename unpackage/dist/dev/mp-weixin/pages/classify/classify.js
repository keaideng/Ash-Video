"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_categorize = require("../../api/modules/categorize.js");
require("../../api/index.js");
require("../../utils/request.js");
if (!Math) {
  Search();
}
const Search = () => "../../components/Search/index.js";
const _sfc_main = {
  __name: "classify",
  setup(__props) {
    const state = common_vendor.reactive({
      addList: {}
    });
    const lw = (name) => {
      common_vendor.index.navigateTo({
        url: "/branch/SearchPage/SearchPage?name=" + name
      });
    };
    common_vendor.onLoad(async (message) => {
      const { data } = await api_modules_categorize.cationApi();
      state.addList = data.data;
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { addList } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(addList), (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: index,
            d: common_vendor.o(($event) => lw(item.name), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/pages/classify/classify.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
