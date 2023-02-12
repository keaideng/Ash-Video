"use strict";
var common_vendor = require("../../common/vendor.js");
var api_modules_login = require("../../api/modules/login.js");
require("../../api/index.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userInfo = common_vendor.reactive({});
    const xg = () => {
      common_vendor.index.navigateTo({
        url: "/branch/modify/modify"
      });
    };
    const lw = () => {
      common_vendor.index.navigateTo({
        url: "/branch/Login/Login"
      });
    };
    const getUserAdd = async () => {
      const res = await api_modules_login.getUser();
      if (res.statusCode !== 200) {
        delete userInfo.nickname;
        return;
      }
      Object.assign(userInfo, res.data);
    };
    common_vendor.onLoad((message) => {
    });
    common_vendor.onShow(() => {
      getUserAdd();
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(xg),
        b: !userInfo.nickname
      }, !userInfo.nickname ? {
        c: common_vendor.o(lw)
      } : {
        d: common_vendor.t(userInfo.nickname),
        e: common_vendor.t(userInfo.signature)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Administrator/Desktop/applet/pages/mine/mine.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
