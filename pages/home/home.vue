<template>
	<view class="home">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<Search></Search>
			<text>分类</text>
		</view>
		<!-- 轮播图 -->
		<view class="carousel">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<image src="../../static/img/发现.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/img/发现1.png" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image src="../../static/img/发现.png" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 内容栏 -->
		<view class="content-bar">
			<view class="">
				
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
	import Search from "../../components/Search/index.vue"
	// 页面加载
	onLoad((message) => {

	})

	// 页面显示
	onShow(() => {

	})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
</script>

<style lang="scss">
	.home {
		padding: 0rpx 20rpx;

		// 搜索导航
		.search-nav {
			display: flex;
			margin-top: 10rpx;
			color: #656771;

			text {
				margin: 20rpx 0rpx 0rpx 10rpx;
			}
		}

		// 轮播图
		.carousel {
			margin-top: 40rpx;
			border-radius: 15rpx;
			background-color: salmon;
		}
		
		// 内容栏
		
	}
</style>
