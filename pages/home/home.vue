<template>
	<view class="home">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<Search>
				<text>分类</text>
			</Search>
		</view>
		<!-- 轮播图 -->
		<view class="carousel">
			<swiper style="height: 422rpx;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" >
				<swiper-item v-for="item in ImageList" :key="item.id">
					<image :src="item.imagePreview"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 内容栏 -->
		<view class="content-bar">
			<!-- 标题 -->
			<view class="content-title">
				<text>为你推荐</text>
			</view>
			<!-- 推荐视频 -->
			<view class="content-Video">
				<view class="Video" v-for="item in addList" :key="item.userId">
					<view class="Video-image">
						<image :src="item.cover" mode="" @click="tzsp(item.videoId)"></image>
						<view class="icon">
							<view class="icon-li">
							<image src="../../static/img/播放.png" mode=""></image>
							<text>{{ item.readCount }}</text>
							<image src="../../static/img/Icon - 观看量.png" mode=""></image>
							<text>{{ item.readCount }}</text>
							</view>
						</view>
					</view>
					<view class="Video-nr">
						<text>{{ item.title }}</text>
						<view class="nr-icon">
							<text>{{ item.classify }}</text>
							<image src="../../static/img/Android更多.png" mode=""></image>
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
	import { carouselApi,getFetchApi } from '../../api/modules/login'
	import { reactive,toRefs } from 'vue'
	const state = reactive({
		ImageList: [],
		addList: [],
		page: {
			pageNumber: 1,
			pageSize: 10
		},
	})
	// 页面加载
	onLoad((message) => {
		carousel()
		Video()
	})
	// 轮播图
	const carousel = async () => {
		const { data } = await carouselApi()
		state.ImageList = data.data
	}
	// 获取视频
	const Video = async () => {
		const { data } = await getFetchApi(state.page)
		state.addList = data
		console.log(data)
	}
	const tzsp = (videoId) => {
		uni.navigateTo({
			url: '/branch/Details/Details?videoId=' + videoId + ''
		})
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
	const { ImageList, addList } = toRefs(state)
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
			image {
				width: 100%;
				height: 100%;
			}
		}
		.wx-swiper-dots {
			left: unset !important;
			right: 0;
		}
		.wx-swiper-dots.wx-swiper-dots-horizontal {
			margin-bottom: 5rpx;
		}
		// 内容栏
		.content-bar {
			margin-top: 40rpx;
			// background-color: antiquewhite;
			// 标题
			.content-title {
				height: 70rpx;
				line-height: 70rpx;
				text {
					font-size: 40rpx;
					font-weight: bold;
				}
			}
			// 推荐视频
			.content-Video{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				.Video {
					position: relative;
					border-radius: 25rpx;
					width: 340rpx;
					height: 340rpx;
					background-color: #ffffff;
					border: 1rpx solid #f1f1f1;
					margin-top: 30rpx;
					overflow: hidden;
					.Video-image {
						height: 191rpx;
						image {
							width: 100%;
							height: 100%;
						}
						.icon {
							position: absolute;
							width: 100%;
							height: 30rpx;
							top: 150rpx;
							.icon-li {
								display: flex;
								width: 100%;
								height: 30rpx;
								line-height: 30rpx;
								color: #f1f1f1;
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
					.Video-nr {
						padding: 0rpx 20rpx;
						margin-top: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						.nr-icon {
							display: flex;
							justify-content: space-between;
							margin-top: 20rpx;
							color: #cdcdcd;
							image {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
