import http from "@/api"

// 分类
export const cationApi = () => http.get('/classify')

// 提交
export const submitApi = (data) => http.post('/video', data)