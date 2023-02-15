<template>
	<view class="home">
			<!-- 添加视频 -->
			<view class="tjvideo">
				<view class="imj" @click="uploud">
					<image v-if="!state.imgUrl" src="../../static/img/c2c00f0cad1b7043b2054ff7d8b17fd.png" class="image1"></image>
					<image  v-else :src="state.imgUrl" alt="" class="image"></image>
				</view>
					<text>点击添加封头像</text>
			</view>
			<!-- 发布 -->
			<view class="release">
				<view class="release_button" @click="avatar" >
					<text>上 传 头 像</text>
				</view>
			</view>
	</view>
</template>

<script setup>
	// vue3小程序生命周期函数
	import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app';
	import {reactive,toRefs} from 'vue';
	import {UploadImage} from '../../utils/upload';
	import { putRevise } from '../../api/modules/login.js'
	const state = reactive({
		imgUrl: '',
	})
	// 页面加载
	const upload = new UploadImage()
	onLoad((message) => {
	
	})
	// 上传图片
	const avatar = async () => {
		const { path } = await upload.upload()
		await putRevise({avatar: path})
		uni.switchTab({ url: '/pages/mine/mine' })
	}
	// 打开文件
	const uploud = async () => {
		const path = await upload.open()
		state.imgUrl = path
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
	const { array } = toRefs(state)
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 1008rpx;
		.tjvideo {
			height: 336rpx;
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
						width: 420rpx;
						height: 100%;
					}
					.image1 {
						margin-top: 120rpx;
					}
			}
		}
		.release {
			margin-top: 140rpx;
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
</style>
