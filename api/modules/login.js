import http from "@/api"

// 注册成功
export const loginApi = (data) => http.post('/user/register', data)

// 获取验证码
export const CaptchaApi = (phone) => http.post('/user/sendCode', { phone })

//登录
export const postApi = (data) => http.post('/user/login', data)

// 获取用户信息
export const getUser = () => http.get('/user/myInfo')

// 修改头像
export const putRevise = ({avatar}) => http.put('/user/avatar', {avatar})

// 获取作品
export const getWorkApi = (data) => http.get('/user/video', data)

// 通过id获取作品
export const reviseApi = (videoId) => http.get('/user/video/fromId', videoId)

// 获取轮播图
export const carouselApi = () => http.get('/carousel')