import http from "@/api"

export const GetHistory = (data) => http.get('/history', data)