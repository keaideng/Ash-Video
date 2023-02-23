import http from "@/api"

// 分类
export const cationApi = () => http.get('/classify')

// 提交
export const submitApi = (data) => http.post('/video', data)

// 搜索
export const SearchApi = (data) => http.get('/video/schema',data)

// 修改
export const revisePut = ({classify, collectionId, cover, describe, title, videoId, videoUrl}) => http.put('/video', {classify, collectionId, cover, describe, title, videoId, videoUrl})

// 发送草稿
export const postDraft = (data) => http.post('/video/draft', data)

// 保存草稿
export const putCancel = ({videoId}) => http.put('/video/cancel', {videoId})
// 发布草稿
export const pushDraft = ({videoId}) => http.put('/video/push', {videoId})

// 删除视频
export const Delete = ({ videoId }) => http.delete('/video', { videoId })