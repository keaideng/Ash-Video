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
      ImageList: [],
      addList: []
    });
    common_vendor.onLoad((message) => {
      carousel();
      Video();
    });
    const carousel = async () => {
      const { data } = await api_modules_login.carouselApi();
      state.ImageList = data.data;
    };
    const Video = async () => {
      loading.value = true;
      const { data } = await api_modules_login.getFetchApi(page);
      state.addList = data;
      loading.value = false;
      return data;
    };
    const tzsp = (videoId) => {
      common_vendor.index.navigateTo({
        url: "/branch/Details/Details?videoId=" + videoId
      });
    };
    const refresherTriggered = common_vendor.ref(false);
    const refresherrefresh = async () => {
      refresherTriggered.value = true;
      await Promise.all([carousel(), Video()]);
      refresherTriggered.value = false;
      lock.value = false;
      page.pageNumber = 1;
    };
    const loading = common_vendor.ref(false);
    const page = {
      pageNumber: 1,
      pageSize: 6
    };
    let lock = common_vendor.ref(false);
    const scrolltolower = async () => {
      if (lock.value || loading.value) {
        return;
      }
      page.pageNumber++;
      loading.value = true;
      const { data } = await api_modules_login.getFetchApi(page);
      loading.value = false;
      if (!data.length) {
        lock.value = true;
        return;
      }
      state.addList.push(...data);
    };
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    common_vendor.onShareAppMessage(() => {
    });
    const { ImageList, addList } = common_vendor.toRefs(state);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          classify: true
        }),
        b: common_vendor.f(common_vendor.unref(ImageList), (item, k0, i0) => {
          return {
            a: item.imagePreview,
            b: item.id
          };
        }),
        c: common_vendor.f(common_vendor.unref(addList), (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.o(($event) => tzsp(item.videoId), item.userId),
            c: common_vendor.t(item.readCount),
            d: common_vendor.t(item.readCount),
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.classify),
            g: item.userId
          };
        }),
        d: common_vendor.t(common_vendor.unref(lock) ? "\u6211\u662F\u6709\u5E95\u7EBF\u7684" : loading.value ? "\u6B63\u5728\u52A0\u8F7D\u4E2D..." : "\u4E0B\u5212\u5F00\u59CB\u52A0\u8F7D"),
        e: refresherTriggered.value,
        f: common_vendor.o(refresherrefresh),
        g: common_vendor.o(scrolltolower)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/pages/home/home.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
