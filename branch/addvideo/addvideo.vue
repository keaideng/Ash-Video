<template>
	<view class="hmde">
		<view class="home">
			<!-- 添加视频 -->
			<view class="tjvideo">
				<view class="imj" @click="UploadCover">
					<image v-if="!addList.cover" src="../../static/img/c2c00f0cad1b7043b2054ff7d8b17fd.png"
						class="image1"></image>
					<image v-else :src="imaUrl" alt="" class="image"></image>
				</view>
				<text>{{ !addList.videoId ? '点击添加封面' : '点击修改封面'}}</text>
			</view>
			<!-- 标题 | 描述 -->
			<view class="label_describe">
				<!-- 标题 -->
				<view class="label" @click="uploud">
					<text class="lab">视频</text>
					<text class="bel">{{ state.ba }}</text>
					<text class="ab">{{ state.ma }}</text>
					<text v-if="zt === 'ing'">{{ state.sum + "%" }}</text>
				</view>
				<view class="jdt">
					<view :style="{ width: state.sum + '%' }"></view>
				</view>
				<!-- 标题 -->
				<view class="label">
					<text class="lab">标题</text>
					<input type="text" placeholder="请填写视频标题" v-model="addList.title">
				</view>
				<!-- 描述 -->
				<view class="label">
					<text class="lab">描述</text>
					<input type="text" placeholder="请填写视频描述" v-model="addList.describe">
				</view>
				<!-- 分类 -->
				<view class="label label1">
					<view class="uni-title uni-common-pl lab">分类</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
									<view class="uni-input">{{ addList.classify || '当前选择'}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<!-- 完成 | 删除 -->

				<view class="complete_delete">
					<!-- 草稿 -->
					<view class="complete" @click="draft">
						<text>保存草稿</text>
					</view>
					<!-- 发布 -->
					<view class="fbu">
						<text @click="push">立即发布</text>
					</view>
					<!-- 取消 -->
					<view class="delete" v-if="!addList.videoId">
						<text @click="qx">取消</text>
					</view>
					<view class="delete" v-else>
						<text @click="deletelb">删除</text>
					</view>
				</view>
				<view class="bottom"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// vue3小程序生命周期函数
	import {
		onShareAppMessage,
		onLoad,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';
	import {
		UploadVideo,
		UploadImage,
	} from '../../utils/upload';
	import {
		putRevise,
		reviseApi
	} from '../../api/modules/login.js'
	import {
		cationApi,
		submitApi,
		revisePut,
		postDraft,
		putCancel,
		pushDraft
	} from '../../api/modules/categorize'
	const state = reactive({
		addList: {
			cover: '',
			videoUrl: '',
			title: '',
			describe: '',
			classify: ''
		},
		array: [],
		Video: '',
		imaUrl: '',
		sum: "",
		ma: '',
		ba: '',
		videoId: ''
	})
	// 封装校验
	const encapsulation = () => {
		const {
			cover,
			videoUrl,
			title,
			describe,
			classify
		} = state.addList
		if (!cover) {
			uni.showToast({
				title: '封面不能为空',
				icon: 'none'
			})
		} else if (!videoUrl) {
			uni.showToast({
				title: '视频不能为空',
				icon: 'none'
			})
		} else if (!title) {
			uni.showToast({
				title: '标题不能为空',
				icon: 'none'
			})
		} else if (title.length < 5 || title.length > 64) {
			uni.showToast({
				title: '标题不能小于5，大于64',
				icon: 'none'
			})
		} else if (!describe) {
			uni.showToast({
				title: '描述不能为空',
				icon: 'none'
			})
		} else if (describe.length < 2 || describe.length > 255) {
			uni.showToast({
				title: '描述不能小于2，大于255',
				icon: 'none'
			})
		} else if (!classify) {
			uni.showToast({
				title: '分类不能为空',
				icon: 'none'
			})
		} else {
			return true
		}
	}
	// 页面加载
	const upload = new UploadVideo()
	const image = new UploadImage()
	upload.onUpdate = (e) => {
		state.sum = e
	}
	onLoad(async (message) => {
		console.log(message.videoId)
		if (message.videoId) {

			const {
				data
			} = await reviseApi({
				videoId: message.videoId
			})
			const res = data.data
			state.addList = res
			state.imaUrl = res.coverPreview
			fz(res.videoUrl)
		}
		const sum = await cationApi()
		state.array = sum.data.data
	})

	// 上传封面
	const UploadCover = async () => {
		await image.open()
		uni.showLoading({ // 显示加载中loading效果 
			title: "正在上传封面",
			mask: true //开启蒙版遮罩
		});
		const {
			path,
			url
		} = await image.upload()
		uni.hideLoading()
		state.addList.cover = path
		state.imaUrl = url
	}


	// 保存草稿
	const revise = async () => {
		uni.showLoading({ // 显示加载中loading效果
			title: "正在提交",
			mask: true //开启蒙版遮罩
		});
		let res
		if (state.addList.videoId) {
			const {
				statusCode
			} = await revisePut(state.addList)
			if (statusCode !== 200) {
				uni.hideLoading()
				return
			}
			res = await putCancel(state.addList)
		} else {
			res = await postDraft(state.addList)
		}
		uni.hideLoading()
		const {
			statusCode
		} = res
		if (statusCode !== 200) {
			return false
		}
		uni.showToast({
			title: '保存成功'
		})
		return true
	}

	// 立即发布
	const pushNow = async () => {
		uni.showLoading({ // 显示加载中loading效果 
					title: "正在发布",
					mask: true //开启蒙版遮罩
				});
		let res
		if (state.addList.videoId) {
			const {
				statusCode
			} = await revisePut(state.addList)
			if (statusCode !== 200) {
				uni.hideLoading()
				return
			}
			res = await pushDraft(state.addList)
		} else {
			res = await submitApi(state.addList)
		}
		uni.hideLoading()
		const {
			statusCode
		} = res
		if (statusCode !== 200) {
			return false
		}
		uni.showToast({
			title: '提交成功'
		})
		return true
	}

	// 保存草稿
	const draft = async () => {
		if (encapsulation() && revise()) {
			// TODO 我的作品
			wx.navigateBack()
		}
	}

	// 立即发布
	const push = async () => {
		if (encapsulation() && pushNow()) {
			// TODO 我的作品
			wx.navigateBack()
		}
	}

	// 获取视频地址
	const fz = (i) => {
		state.Video = i.slice(11)
		state.ma = state.Video.slice(-8)
		state.ba = state.Video.slice(0, -8)
	}
	// null ing ed
	const zt = ref('null')
	// 上传视频
	const uploud = async () => {
		await upload.open()
		zt.value = 'ing'
		fz(upload.filePath)
		const {
			url,
			path
		} = await upload.upload()
		state.addList.videoUrl = path
		zt.value = 'ed'
	}
	// 删除
	const deletelb = async () => {
		state.addList = {}
	}
	// 取消发布
	const qx = () => {
		state.addList = {}
		// TODO 我的作品
		uni.switchTab({
			url: '/branch/MyWork/MyWork'
		})
	}
	// 下拉框
	const selectTaps = async () => {
		state.shows = true
	}
	const optionTaps = async (e) => {
		state.shows = false
	}
	const bindPickerChange = async (e) => {
		const index = e.detail.value
		state.addList.classify = state.array[index].name
	}
	// 页面显示
	onShow(() => {

	})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})

	const {
		addList,
		selectDatas,
		array,
		imaUrl,
		Video,
		videoId
	} = toRefs(state)
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 864rpx;

		.tjvideo {
			// background-color: #F0F0F0;
			background-color: #F8F8F8;
			text-align: center;

			text {
				line-height: 420rpx;
				font-size: 32rpx;
				color: grey;
			}

			.imj {
				position: absolute;
				overflow: hidden;
				width: 100%;
				height: 422rpx;

				.image {
					min-width: 100%;
					min-height: 100%;
				}

				.image1 {
					width: 48rpx;
					height: 48rpx;
					margin-top: 120rpx;
				}

				video {
					width: 100%;
					height: 100%;
				}
			}
		}

		.label_describe {
			height: 431rpx;
			background-color: #FFF;

			.label1 {
				border-bottom: 0rpx solid #E0E0E0 !important;
			}

			.label {
				height: 90rpx;
				border-bottom: 2rpx solid #E0E0E0;
				display: flex;
				line-height: 90rpx;

				.uni-list {
					flex: 1;

					.uni-list-cell {
						display: flex;

						.uni-list-cell-db {
							font-size: 36rpx;
							flex: 1;
						}
					}

					picker {
						height: 90rpx;
					}
				}

				.bel {
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 30rpx;
				}

				.lab {
					margin-right: 20rpx;
					margin-left: 20rpx;
					font-size: 40rpx;
					flex-shrink: 0;
				}

				.ab {
					font-size: 30rpx;
				}

				text {
					line-height: 90rpx;
					font-size: 44rpx;
				}

				input {
					font-size: 36rpx;
					margin: 21rpx 0rpx;
					border: 0rpx;
				}
			}
		}

		.complete_delete {
			display: flex;
			text-align: center;

			view {
				width: 300rpx;
				height: 100rpx;
				line-height: 100rpx;
				border: rpx solid #f1f1f1;
				color: #fff;
			}

			.complete {
				background-color: #ccc;
				color: #333;
			}

			.fbu {
				background-color: #FF6699;
			}

			.delete {
				background-color: red;
			}
		}
	}


	.jdt {
		height: 6rpx;
		background-color: #F8F8F8;

		view {
			width: 0rpx;
			height: 6rpx;
			background-color: #FF6699;
		}
	}
</style>
