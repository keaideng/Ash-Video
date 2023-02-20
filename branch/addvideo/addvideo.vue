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
				<view class="label">
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
					<!-- 完成 -->
					<view class="complete" @click="avatar">
						<text>完成</text>
					</view>
					<!-- 删除 -->
					<view class="delete">
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
		UploadImage
	} from '../../utils/upload';
	import {
		putRevise,
		reviseApi
	} from '../../api/modules/login.js'
	import {
		cationApi,
		submitApi,
		revisePut
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
		} else if (title.length <= 5 && title.length <= 64) {
			uni.showToast({
				title: '标题不能小于5，大于64',
				icon: 'none'
			})
		} else if (!describe) {
			uni.showToast({
				title: '描述不能为空',
				icon: 'none'
			})
		} else if (describe.length <= 5 && describe.length <= 255) {
			uni.showToast({
				title: '标题不能小于5，大于255',
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
		if (message.videoId) {
			const {
				data
			} = await reviseApi(message.videoId)
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
		uni.showLoading({  // 显示加载中loading效果 
		    title: "正在上传封面",
		    mask: true  //开启蒙版遮罩
		});
		const {
			path,
			url
		} = await image.upload()
		uni.hideLoading()
		state.addList.cover = path
		state.imaUrl = url
	}
	// 提交视频
	const avatar = async () => {
		const b = encapsulation()
		if (b) {
			if (!addList.videoId) {
				await submitApi(state.addList)
			} else {
				await revisePut(addList.videoId)
			}
			uni.switchTab({
				url: '/pages/mine/mine'
			})
			return uni.showToast({
				title: '上传成功',
				icon: 'none'
			})
			state.addList = {}
		}

	}
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
	// 下拉框
	const selectTaps = async () => {
		state.shows = true
	}
	const optionTaps = async (e) => {
		state.shows = false
		console.log(e)
	}
	const bindPickerChange = async (e) => {

		console.log(state.array)
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
	.hmde {
		height: 1182rpx;
		background-color: #F0F0F0;
	}

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
				width: 100%;
				height: 420rpx;

				image {
					width: 58rpx;
					height: 58rpx;
				}

				.image {
					width: 100%;
					height: 422rpx;
				}

				.image1 {
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

			.label {
				height: 90rpx;
				border-bottom: 3rpx solid #E0E0E0;
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
			height: 100rpx;
			background-color: lightcoral;
			display: flex;
			border-top: 3rpx solid #E0E0E0;

			.complete {
				width: 375rpx;
				height: 100rpx;
				background-color: sandybrown;
				text-align: center;
				background-color: #FF6699;

				text {
					line-height: 100rpx;
					font-size: 36rpx;
					color: #FFF;
				}
			}

			.delete {
				width: 375rpx;
				height: 100rpx;
				background-color: lawngreen;
				text-align: center;
				background-color: #FFF;

				text {
					line-height: 100rpx;
					font-size: 36rpx;
				}
			}
		}
	}

	.bottom {
		height: 17rpx;
		background-color: #E8E8E8;
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
