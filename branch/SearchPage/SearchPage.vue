<template>
	<!-- 搜索栏 -->
	<view class="search">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<navigator>
				<icon type="search" size="13"></icon>
				<!-- <text>精彩热搜: 湖南众智学院</text> -->
				<input type="text" value="" placeholder="精彩热搜: 湖南众智学院" />
			</navigator>
			<view class="nav">
				<text>搜索</text>
			</view>
		</view>
	</view>
	<!-- 内容栏 -->
	<view class="content">
		<view class="content-bar">
			<view class="bar-image">
				<image src="../../static/图1.jpg" mode=""></image>
			</view>
			<view class="bar-nr">
				<view class="nr-li">围殴欧文欸认为偶尔五日哦i恶恶肉i恶恶人iewu哦i恶恶哦i肉i人u而我i入俄我i溽热我i日哦额外</view>
				<view class="nr-bf">
					<view class="icon">
						<view class="icon-li">
							<view class="li1">
								<image src="../../static/img/播放.png" mode=""></image>
								<text>123</text>
							</view>
							<view class="li1">
								<image src="../../static/img/浏览.png" mode=""></image>
								<text>11</text>
							</view>
							<view>
								<image src="../../static/img/Android更多 (1).png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
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
	// 搜索栏
	.search {
		padding: 20rpx;

		// 搜索导航
		.search-nav {
			display: flex;
			color: #656771;
			navigator {
				position: relative;
				flex: 1;
				width: 620rpx;
				height: 66rpx;
				background-color: #f7f7f7;
				border-radius: 30rpx;
				line-height: 66rpx;
				font-size: 26rpx;
			
				icon {
					position: absolute;
					top: 14rpx;
					left: 25rpx;
					margin-right: 10rpx;
				}
				input {
					position: absolute;
					top: 12rpx;
					left: 60rpx;
				}
			}
			.nav {
				position: relative;
				top: 14rpx;
			}
			
		}
	}

	// 内容栏
	.content {
		height: 700rpx;
		// background-color: saddlebrown;

		.content-bar {
			padding: 20rpx;
			height: 200rpx;
			border-bottom: 1rpx solid #f1f1f1;
			display: flex;

			.bar-image {
				width: 300rpx;
				height: 100%;
				border-radius: 25rpx;
				overflow: hidden;
			}

			.bar-nr {
				position: relative;
				flex: 1;
				margin-left: 20rpx;
				.nr-li {
					overflow: hidden;					
					height: 80rpx;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
				.nr-bf {
					position: absolute;
					bottom: 0;

					.icon {
						width: 100%;
						height: 30rpx;

						.icon-li {
							display: flex;
							width: 100%;
							height: 30rpx;
							line-height: 30rpx;
							color: #333;

							.li1 {
								display: flex;
								width: 160rpx;
								align-items: flex-start;
							}

							image {
								width: 30rpx;
								height: 30rpx;
								margin-left: 20rpx;
							}

							text {

								margin-left: 10rpx;
								font-size: 25rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
