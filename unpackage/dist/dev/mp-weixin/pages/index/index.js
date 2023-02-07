"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
