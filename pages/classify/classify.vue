<template>
	<view class="home">
		<view class="search-nav">
			<Search></Search>
		</view>
	<!-- 热门分类 -->
	<view class="cation">
			<view class="cation-item">
				<text>热门分类</text>
			</view>
			<view class="classify">
				<view class="l">
					<view>
						<image src='../../static/logo.png'></image>
					</view>
					<text>分类</text>
				</view>
				<view class="l">
					<view>
						<image src='../../static/logo.png'></image>
					</view>
					<text>分类</text>
				</view>
				<view class="l">
					<view>
						<image src='../../static/logo.png'></image>
					</view>
					<text>分类</text>
				</view>
				<view class="l">
					<view>
						<image src='../../static/logo.png'></image>
					</view>
					<text>分类</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 中间线 -->
	<view class="qqq"></view>
	<!-- 全部分类 -->
	<view class="allsort">
		<view class="sort">
			<text>全部分类</text>
		</view>
		<view class="qb">
			<view class="qb_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="qb_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="qb_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="qb_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
		</view>
		<view class="bq">
			<view class="bq_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="bq_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="bq_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
			</view>
			<view class="bq_item">
				<view>
					<image src='../../static/logo.png'></image>
				</view>
				<text>分类</text>
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
	}
	.search-nav {
		display: flex;
		margin-top: 10rpx;
		color: #656771;

		text {
			margin: 20rpx 0rpx 0rpx 10rpx;
		}
	}
	.cation {
		margin-top: 40rpx;
		height: 300rpx;

		.cation-item {
			height: 40rpx;
			padding: 0rpx 14rpx;
			text {
				font-weight: bold;
				font-size: 40rpx;
			}
		}
	}
	.classify {
		width: 650rpx;
		height: 180rpx;
		display: flex;
		justify-items: center;
		margin-top: 36rpx;

		.l {
			width: 100rpx;
			height: 100rpx;
			line-height: 80rpx;
			margin: 42rpx;
			margin-right: 37rpx;
			image {
				width: 100rpx;
				height: 100rpx;	
				// margin-right: 54rpx;
				margin-bottom: -30rpx;
			}
			text {
				font-size: 38rpx;
				color: #656771;
				margin-left: 10rpx;
			}
		}
	}
	.qqq {
		width: 800rpx;
		height: 20rpx;
		background-color: #F7F7F7;
	}
	.allsort {
		width: 750rpx;
		height: 615rpx;
		.sort {
			width: 100%;
			height: 70rpx;
			padding: 20rpx 20rpx;
			text {
				font-weight: bold;
				font-size: 40rpx;
				margin-left: 14rpx;
			}
		}
		.qb {
			width: 100%;
			// height: 272rpx;
			height: 225rpx;
			margin-left: 54rpx;
			margin-top: 10px;
			display: flex;
			.qb_item {
				width: 160rpx;
				height: 267rpx;
				margin: 9rpx;
				image {
					width: 100rpx;
					height: 100rpx;	
					margin-right: 54rpx;
				}
				text {
					font-size: 38rpx;
					color: #656771;
					margin-left: 10rpx;
				}
			}
		}
		.bq {
			width: 100%;
			height: 200rpx;
			margin-left: 54rpx;
			display: flex;
			.bq_item {
				width: 160rpx;
				height: 267rpx;
				margin: 9rpx;
				image {
					width: 100rpx;
					height: 100rpx;	
					margin-right: 54rpx;
				}
				text {
					font-size: 38rpx;
					color: #656771;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
