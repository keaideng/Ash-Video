<template>
	<view>
		<view class="tb">
			<view>
				<image v-if="!userInfo.avatar" src="../../static/mrtx.png" mode=""></image>
				<image v-else :src="userInfo.avatar" mode=""></image>
			</view>
			
			<view class="tb1" v-if="!userInfo.nickname">
				<view class="tb2" @click="lw">点击登录</view>
				<view class="tb3">请先登录</view>
			</view>
			<view class="tb1" v-else>
				<view class="tb2">{{ userInfo.nickname }}</view>
				<view class="tb3">{{ userInfo.signature }}</view>
			</view>
		</view>
		<view class="st">
			<navigator class="st-item" @click="wdzp('/branch/MyWork/MyWork')">
				<view>
					<image src="../../static/image/zp.png" mode=""></image>
					<text>我的作品</text>
				</view>
				<view class="item1">
					<text v-if='userInfo.videoCount'>{{userInfo.videoCount}}个</text>
					<image src="../../static/yjt.png" mode=""></image>
				</view>
				
				
			</navigator>
			<navigator class="st-item1" @click="wdzp('/branch/Collection/Collection')">
				<view>
					<image src="../../static/image/dz.png" mode=""></image>
					<text>我的点赞</text>
				</view>
				<view class="item1">
					<image src="../../static/yjt.png" mode=""></image>
				</view>
			</navigator>
			<navigator class="st-item1">
				<view class="item">
					<image src="../../static/image/gz.png" mode=""></image>
					<text>我的关注</text>
				</view>
				<view class="item1">
					<text></text>
					<image src="../../static/yjt.png" mode=""></image>
				</view>
				
			</navigator>
			<navigator class="st-item1" @click="wdzp('/branch/History/History')">
				<view>
					<image src="../../static/image/ls.png" mode=""></image>
					<text>历史记录</text>
				</view>
				<view class="item1">
					<image src="../../static/yjt.png" mode=""></image>
				</view>
			</navigator>
			<navigator class="st-item1" @click="wdzp('/branch/modify/modify')">
				<view>
					<image src="../../static/image/sz.png" mode=""></image>
					<text>我的设置</text>
				</view>
				<view class="item1">
					<image src="../../static/yjt.png" mode=""></image>
				</view>
			</navigator>
		</view>
		<view class="pg" @click="wdzp('/branch/addvideo/addvideo')">
			<button>立即投稿</button>
		</view>
		<view class="tuichu" v-if="userInfo.nickname" @click="quit">
			<text >退出登录</text>
		</view>
	</view>
</template>

<script setup>
// vue3小程序生命周期函数
import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { getUser } from '../../api/modules/login.js'
import {reactive,toRefs} from 'vue';
const userInfo = reactive({
})
const lw = () => {
	uni.navigateTo({
		url: '/branch/Login/Login'
	})
}

const wdzp = (url) => {
	const token = uni.getStorageSync('authorization')
	if (!token) {
		return uni.showToast({
			title: '未登录',
			icon: 'error'
		})
	} else {
		uni.navigateTo({
			url: url
		})
	}
}
const getUserAdd = async () => {
	const res= await getUser()
	if(res.statusCode !== 200) {
		delete userInfo.nickname
		return 
	}
	Object.assign(userInfo, res.data)
}

const quit = () => {
	userInfo.nickname = ''
	userInfo.avatar = ''
	userInfo.signature = ''
	userInfo.videoCount = ''
	wx.clearStorage()
}

// 页面加载
onLoad((message) => {
	
})

// 页面显示
onShow(() => {
	if(uni.getStorageSync('authorization')) {
		getUserAdd()
	}
})

// 页面隐藏
onHide(() => {
	
})

// 页面分享(不定义该函数 页面将无法分享)
onShareAppMessage(() => {
	
})
</script>

<style lang="scss">
.tb{
	// margin-bottom: 30px;
	// margin-top: 20px;
	// height: 30px;
	display: flex;
	align-items: center;
	image{
		float: left;
		width: 75px;
		height: 75px;
		margin-left: 10px;
		// margin-top: -16px;
		border-radius: 999px;
	}
	.tb1{
		margin-top: 15px;
		margin-left: 8px;
		.tb2{
			color: #FB7299;
			font-size: 17px;
			// margin-bottom: 8px;
			margin-top: 15px;
		}
		.tb3{
			color: #A9A5A0;
			font-size: 12px;
			margin-bottom: 30px;
			// line-height: 30px;
			margin-top: 5px;
		}
	}
}
.st{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	border-top: 10px solid #f5f5f4;
	border-bottom-color: #A9A5A0;
	.st-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 40rpx;
		height: 80rpx;
		margin-bottom: 20rpx;
		line-height: 80rpx;
		view {
			display: flex;
			align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
			}
			text {
				margin-left: 30rpx;
				color: #000;
				font-size: 35rpx;
			}
		}
		.item1 {
			display: flex;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 10rpx;
			}
		}
		text {
			color: #A9A5A0;
		}
	}
	.st-item1 {
		display: flex;
		padding: 0 40rpx;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
		margin-bottom: 20rpx;
		line-height: 80rpx;
		color: #A9A5A0;
		view {
			display: flex;
			align-items: center;
			text {
				margin-left: 30rpx;
				font-size: 35rpx;
				color: #000;
			}
		}
		image {
			// margin-top: 20rpx;
			width: 40rpx;
			height: 40rpx;
		}
		.item1 {
			display: flex;
			image {
				width: 30rpx;
				height: 30rpx;
				margin-left: 10rpx;
			}
		}
	}
}
.pg{
	button{
		height: 60px;
		line-height: 60px;
		margin-top: 20px;
		color: #fff;
		background-color: #FB7299;
		border-radius: 50px;
		margin-left: 20px;
		margin-right: 20px;
	}
}
.tuichu {
	position: absolute;
	text-align: center;
	width: 200rpx;
	height: 100rpx;
	line-height: 100rpx;
	left: 38%;
	bottom: 50rpx;
	color: #A9A5A0;
	// background-color: #FB7299;
}
</style>
