import http from "@/api"

// 获取历史记录
export const GetHistory = (data) => http.get('/history', data)

// 获取点赞
export const GetLike = (data) => http.get('/like', data)
