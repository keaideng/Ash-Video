import http from "@/api"

// 注册成功
export const getUploadTokenApi = () => http.post('/upload/video')
