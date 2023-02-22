import { getUploadTokenApi } from '../api/modules/upload.js'

export class UploadImage {
	filePath = ''
	count = 1
	type = 'image'
	open() {
		return new Promise((r, e) => {
			wx.chooseMedia({
				count: this.count,
				type: this.type,
				success: (res) => {
					this.filePath = res.tempFiles[0].tempFilePath
					r(this.filePath)
				},
				fail: (err) => {
					e(err)
				}
			})
		})
	}
	upload() {
		return new Promise((r, e) => {
			uni.uploadFile({
				url: 'https://tts.flycran.com/upload/image',
				header: {
					authorization: uni.getStorageSync('authorization')
				},
				name: 'file',
				filePath: this.filePath,
				success: (res) => {
					const data = JSON.parse(res.data)
					r(data)
				},
				fail: (err) => {
					e(err)
				}
			})
		})
	}
}

export class UploadVideo {
	filePath = ''
	count = 1
	type = 'video'
	onUpdate = null
	onComplete = null
	open() {
		return new Promise((r, e) => {
			uni.chooseMedia({
				count: this.count,
				type: this.type,
				success: (res) => {
					console.log(res);
					this.filePath = res.tempFiles[0].tempFilePath
					r(this.filePath)
				},
				fail: (err) => {
					e(err)
				}
			})
		})
	}
	upload() {
		return new Promise(async (r, e) => {
			const { data } = await getUploadTokenApi()
			const uploadTask = uni.uploadFile({
				url: 'https://upload.qiniup.com',
				header: {
					authorization: uni.getStorageSync('authorization')
				},
				formData: {
					token: data.token
				},
				name: 'file',
				filePath: this.filePath,
				success: (res) => {
					const data = JSON.parse(res.data)
					this.onComplete && this.onComplete(data)
					r(data)
				},
				fail: (err) => {
					e(err)
				}
			})
			uploadTask.onProgressUpdate((res) => {
				this.onUpdate && this.onUpdate(res.progress)
			})
		})
	}
}