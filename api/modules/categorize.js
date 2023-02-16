import http from "@/api"

// 分类
export const cationApi = () => http.get('/classify')

// 提交
export const submitApi = (data) => http.post('/video', data)

// 搜索
export const SearchApi = (data) => http.get('/video/schema',data)

// 修改
export const revisePut = (videoId) => http.put('/video', videoId)