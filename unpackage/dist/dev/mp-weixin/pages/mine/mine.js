"use strict";
const common_vendor = require("../../common/vendor.js");
const api_modules_login = require("../../api/modules/login.js");
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
      console.log(userInfo);
    };
    const quit = () => {
      userInfo.avatar = "";
      wx.clearStorage();
      getUserAdd();
    };
    const Submission = () => {
      common_vendor.index.navigateTo({
        url: "/branch/addvideo/addvideo"
      });
    };
    common_vendor.onLoad((message) => {
    });
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("authorization")) {
        getUserAdd();
      }
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !userInfo.avatar
      }, !userInfo.avatar ? {} : {
        b: userInfo.avatar
      }, {
        c: common_vendor.o(xg),
        d: !userInfo.nickname
      }, !userInfo.nickname ? {
        e: common_vendor.o(lw)
      } : {
        f: common_vendor.t(userInfo.nickname),
        g: common_vendor.t(userInfo.signature)
      }, {
        h: common_vendor.t(userInfo.videoCount),
        i: common_vendor.o(Submission),
        j: common_vendor.o(quit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/pages/mine/mine.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
