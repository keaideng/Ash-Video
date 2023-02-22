<template>
	<view class="home">
		<view class="ttt">
			<!-- 添加视频 -->
			<view class="tjvideo">
				<view class="imj" @click="uploud">
					<!-- <image v-if="!state.imgUrl" src="../../static/img/c2c00f0cad1b7043b2054ff7d8b17fd.png" class="image1"></image> -->
					<image :src="state.avatar" alt="" class="image"></image>
				</view>
				<!-- <text>修 改 头 像</text> -->
			</view>
			<!-- 用户名 -->
			<view class="user">
				<view class="user-li">
					<input maxlength="6" type="text" v-model="state.nickname">
				</view>
			</view>
		</view>


		<!-- 个人详情 -->
		<view class="details">
			<text>个性签名:</text>
			<view class="grjjb">
				<textarea rows="6" class="grjj" v-model="state.signature" placeholder="输入个性签名"></textarea>
			</view>
		</view>
		<!-- 发布 -->
		<view class="release">
			<view class="release_button" @click="tijiao">
				<text>修 改 信 息</text>
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
		toRefs
	} from 'vue';
	import {
		UploadImage
	} from '../../utils/upload';
	import {
		putRevise,
		putUser,
		getUser
	} from '../../api/modules/login.js'
	const state = reactive({
		avatar: '',
		nickname: '',
		signature: '',
	})
	// 页面加载
	const upload = new UploadImage()
	onLoad((message) => {})
	const fz = () => {
		const {
			nickname,
			signature
		} = state
		if (!nickname) {
			uni.showToast({
				title: '用户名不能为空',
				icon: 'error'
			})
		} else if (nickname.length < 2 || nickname.length > 16) {
			uni.showToast({
				title: '用户名不能小于2，不能大于16',
				icon: 'error'
			})
		} 
		else if (!signature) {
			uni.showToast({
				title: '个性签名不能为空',
				icon: 'error'
			})
		}else if (signature.length < 1 || signature.length > 255) {
				uni.showToast({
					title: '个人签名不能小于1, 不能大于255',
					icon: 'error'
				})
			}
		else {
			return true
		}
	}
	// 上传图片
	const avatar = async () => {
		const {
			path,
			url
		} = await upload.upload()
		const { statusCode } = await putRevise({
			avatar: path
		})
		if(statusCode === 200) {
			uni.showToast({
				title: '修改成功',
				icon: 'success'
			})
		}
		state.avatar = url
	}
	// 提交
	const tijiao = async () => {
		if(fz()) {
			const {
				statusCode
			} = await putUser({
				nickname: state.nickname,
				signature: state.signature
			})
			if (statusCode === 200) {
				uni.showToast({
					title: '修改成功',
					icon: 'success'
				})
			}
		}
	}
	// 打开文件
	const uploud = async () => {
		const path = await upload.open()
		state.imgUrl = path
		avatar()
	}

	// 页面显示
	onShow(async () => {
		const {
			data
		} = await getUser()
		state.avatar = data.avatar
		state.nickname = data.nickname
		state.signature = data.signature
	})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
	const {
		array,
		nickname,
		signature
	} = toRefs(state)
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;

		.ttt {
			padding-top: 16rpx;
			display: flex;
			align-items: center;
		}

		.tjvideo {
			width: 185rpx;
			height: 185rpx;
			margin: 10rpx 20rpx;
			border-radius: 999rpx;
			background-color: #F8F8F8;
			text-align: center;

			text {
				line-height: 190rpx;
				font-size: 29rpx;
				color: grey;
			}

			.imj {
				width: 185rpx;
				height: 185rpx;
				border-radius: 999rpx;

				image {
					width: 50rpx;
					height: 50rpx;
				}

				.image {
					width: 185rpx;
					height: 185rpx;
					border-radius: 999rpx;
				}

				.image1 {
					position: absolute;
					top: 65rpx;
					left: 100rpx;
				}
			}
		}

		.release {
			margin-top: 40rpx;
			height: 155rpx;

			.release_button {
				width: 700rpx;
				margin: 0 auto;
				height: 120rpx;
				background-color: #FF6699;
				border-radius: 100rpx;
				text-align: center;

				text {
					font-size: 40rpx;
					line-height: 120rpx;
					color: #FFF;
				}
			}
		}
	}

	.user {
		margin-left: 24rpx;
		flex: 1;

		.user-li {
			display: flex;
			width: 100%;
		}

		input {
			width: 100%;
			font-size: 40rpx;
			color: #666;
			margin-top: 25rpx;
		}
	}

	.details {
		flex: 1;
		border-top: #ccc 1rpx solid;
		margin: 12rpx 32rpx;
		margin-top: 32rpx;

		text {
			font-size: 30rpx;
			color: #666;
		}
	}

	.grjjb {}

	.grjj {
		margin: 20rpx 0;
		border: 0;
		border-radius: 0;
		padding: 12rpx;
		height: 200rpx;
		font-size: 30rpx;
		color: #666;
	}
</style>
