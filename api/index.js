// 导入request对象 做基础配置
import { $http } from '@/utils/request.js'

// 配置默认请求地址
$http.baseUrl = 'https://tts.flycran.com'


// 配置请求拦截器
$http.beforeRequest = function(req) {
	console.log('--发起请求--')
	// token
	req.header.authorization = uni.getStorageSync('authorization') || ''
}

// 配置请求后处理器
$http.afterRequest = function() {
	// 每次请求完成关闭加载效果
	// uni.hideLoading()
}
// 导出配置好的请求对象
export default $http