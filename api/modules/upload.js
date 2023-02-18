import http from "@/api"

// 获取视频
export const getUploadTokenApi = () => http.post('/upload/video')

// 获取视频详情
export const VideoDetails = ({videoId}) => http.get('/video/fromId', {videoId})

// 获取评论
export const getReviews = ({ videoId }) => http.get('/comment/video', { videoId })

// 发布评论
export const postComts = ( data ) => http.post('/comment/component', data)

// 回复评论
export const postReply = ( data ) => http.post('/comment/reply', data)

// 获取回复评论
export const getReply = ({ commentId }) => http.get('/comment/reply', {commentId})