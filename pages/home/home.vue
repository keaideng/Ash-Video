<template>
	<view class="home">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<navigator url="/subpkg/search/search">
				<icon type="search" size="13"></icon>
				<text>精彩热搜: 湖南众智学院</text>
			</navigator>
			<text>分类</text>
		</view>
		<!-- 轮播图 -->
		<view class="carousel">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/img/发现.png" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
			</swiper>
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
			margin-top: 20rpx;
			color: #656771;

			navigator {
				width: 620rpx;
				height: 66rpx;
				background-color: #f7f7f7;
				border-radius: 30rpx;
				line-height: 66rpx;
				font-size: 26rpx;

				icon {
					position: relative;
					top: 4rpx;
					left: 10rpx;
					margin-right: 10rpx;
				}
			}

			text {
				margin: 10rpx 0rpx 0rpx 10rpx;
			}
		}
		// 轮播图
		.carousel {
			
		}
	}
</style>
