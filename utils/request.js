// import { UserStore } from "../store/user"

class Request {
	constructor(options = {}) {
		// 请求的根路径
		this.baseUrl = options.baseUrl || ''
		// 请求的 url 地址
		this.url = options.url || ''
		// 请求方式
		this.method = 'GET'
		// 请求的参数对象
		this.data = null
		// header 请求头
		this.header = options.header || {}
		this.beforeRequest = null
		this.afterRequest = null
	}

	get(url, data = {}) {
		this.method = 'GET'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	post(url, data = {}) {
		this.method = 'POST'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	put(url, data = {}) {
		this.method = 'PUT'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	delete(url, data = {}) {
		this.method = 'DELETE'
		this.url = this.baseUrl + url
		this.data = data
		return this._()
	}

	_() {
		// 清空 header 对象
		this.header = {}
		// 请求之前做一些事
		this.beforeRequest && typeof this.beforeRequest === 'function' && this.beforeRequest(this)
		// 发起请求
		return new Promise((resolve, reject) => {
			let weixin = wx
			// 适配 uniapp
			if ('undefined' !== typeof uni) {
				weixin = uni
			}
			weixin.request({
				url: this.url,
				method: this.method,
				data: this.data,
				header: this.header,
				success: (res) => {
					// // 响应成功  处理响应结果
					// const { data, resultCode, message } = res.data
					// // 状态码不为200 则错误
					// if (resultCode !== 200) {
					// 	uni.showToast({ title: message || '网络出现了问题', icon: 'none' })
					// 	// 判断是否为416【token失效/token不存在】
					// 	if (resultCode === 416) {
					// 		// 1. 清理登录状态
					// 		UserStore().clearUser()
					// 		// 2. 跳转登录页面【看需求】
					// 		// 堆叠页面  |  替换页面
					// 		uni.redirectTo({ url: '/subpkg/login/login' })
					// 	}
					// 	return reject(message || '错误')
					// }
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				},
				complete: (res) => {
					// 请求完成以后做一些事情
					this.afterRequest && typeof this.afterRequest === 'function' && this
						.afterRequest(res)
				}
			})
		})
	}
}

export const $http = new Request()