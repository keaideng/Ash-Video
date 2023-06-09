import http from "@/api"

// 注册成功
export const loginApi = (data) => http.post('/user/register', data)

// 获取验证码
export const CaptchaApi = (phone) => http.post('/user/sendCode', { phone })

//登录
export const postApi = (data) => http.post('/user/login', data)

// 获取用户信息
export const getUser = () => http.get('/user/myInfo')