<template>
	<view>
		<view class="tb">
			<view @click="xg">
				<image src="../../static/图1.jpg" mode=""></image>
			</view>
			
			<view class="tb1" v-if="state.userList.length">
				<view class="tb2" @click="lw">点击登录</view>
				<view class="tb3">请先登录</view>
			</view>
			<view class="tb1" v-else>
				<view class="tb2">{{ state.userList.nickname }}</view>
				<view class="tb3">{{ state.userList.signature }}</view>
			</view>
		</view>
		<view class="st">
			<navigator class="st-item" url="../../branch/MyWork/MyWork">
				<view>
					<image src="../../static/视频.png" mode=""></image>
					<text>我的作品</text>
				</view>
				<text>0个</text>
			</navigator>
			<navigator class="st-item1" url="../../branch/Collection/Collection">
				<view>
					<image src="../../static/收藏.png" mode=""></image>
					<text>收藏</text>
				</view>
				<image src="../../static/右箭头.png" mode=""></image>
			</navigator>
			<navigator class="st-item2">
				<view class="item">
					<image src="../../static/关注.png" mode=""></image>
					<text>关注</text>
				</view>
				<view class="item1">
					<text>0</text>
					<image src="../../static/右箭头.png" mode=""></image>
				</view>
				
			</navigator>
			<navigator class="st-item1" url="../../branch/History/History">
				<view>
					<image src="../../static/历史记录.png" mode=""></image>
					<text>历史记录</text>
				</view>
				<image src="../../static/右箭头.png" mode=""></image>
			</navigator>
			<navigator class="st-item1">
				<view>
					<image src="../../static/历史记录.png" mode=""></image>
					<text>我的设置</text>
				</view>
				<image src="../../static/右箭头.png" mode=""></image>
			</navigator>
		</view>
		<view class="pg">
			<button>立即投稿</button>
		</view>
	</view>
</template>

<script setup>
// vue3小程序生命周期函数
import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { getUser } from '../../api/modules/login.js'
import {reactive,toRefs} from 'vue';
const state = reactive({
	userList: {}
})
const xg = () => {
	uni.navigateTo({
		url: '/branch/modify/modify'
	})
}
const lw = () => {
	uni.navigateTo({
		url: '/branch/Login/Login'
	})
}
const getUserAdd = async () => {
	const res= await getUser()
	state.userList = res.data
}
// 页面加载
onLoad((message) => {
})

// 页面显示
onShow(() => {
	getUserAdd()
})

// 页面隐藏
onHide(() => {
	
})

// 页面分享(不定义该函数 页面将无法分享)
onShareAppMessage(() => {
	
})
const { userList } = toRefs(state)
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
	padding: 40rpx;
	border-bottom-color: #A9A5A0;
	.st-item {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
		// background-color: #FB7299;
		margin-bottom: 20rpx;
		line-height: 80rpx;
		view {
			display: flex;
			image {
				margin-top: 26rpx;
				width: 30rpx;
				height: 30rpx;
			}
			text {
				margin-left: 30rpx;
				color: #000;
			}
		}
		text {
			color: #A9A5A0;
		}
	}
	.st-item1 {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
		// background-color: #FB7299;
		margin-bottom: 20rpx;
		line-height: 80rpx;
		view {
			display: flex;
			text {
				margin-left: 30rpx;
				color: #000;
			}
		}
		image {
			margin-top: 26rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}
	.st-item2 {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 80rpx;
		// background-color: #FB7299;
		margin-bottom: 20rpx;
		line-height: 80rpx;
		image {
			margin-top: 26rpx;
			width: 30rpx;
			height: 30rpx;
		}
		.item {
			display: flex;
			text {
				margin-left: 30rpx;
				color: #000;
			}
		}
		.item1 {
			display: flex;
			text {
				margin-right: 10rpx;
				color: #A9A5A0;
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
</style>
