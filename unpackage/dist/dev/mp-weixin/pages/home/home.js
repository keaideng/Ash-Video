"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_login = require("../../api/modules/login.js");
require("../../api/index.js");
require("../../utils/request.js");
if (!Math) {
  Search();
}
const Search = () => "../../components/Search/index.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const state = common_vendor.reactive({
      ImageList: []
    });
    common_vendor.onLoad((message) => {
      carousel();
    });
    const carousel = async () => {
      const { data } = await api_modules_login.carouselApi();
      state.ImageList = data.data;
      console.log(state.ImageList);
    };
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { ImageList } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(ImageList), (item, k0, i0) => {
          return {
            a: item.imagePreview,
            b: item.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/pages/home/home.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
