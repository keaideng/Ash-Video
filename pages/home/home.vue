<template>
	<view class="home">
		<!-- 搜索导航 -->
		<Search classify>
		</Search>
		<scroll-view class="main" scroll-y refresher-enabled :refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
			<!-- 轮播图 -->
			<view class="carousel">
				<swiper style="height: 422rpx;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular >
					<swiper-item v-for="item in ImageList" :key="item.id" @click="carouselMap(item)">
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
								<image src="../../static/bf.png" mode=""></image>
								<text>{{ item.readCount }}</text>
								<image src="../../static/img/dz.png" mode=""></image>
								<text>{{ item.likeCount }}</text>
								</view>
							</view>
							<view class="tsb">
							</view>
						</view>
						<view class="Video-nr">
							<text class="nr">{{ item.title }}</text>
							<view class="nr-icon">
								<text>{{ item.classify }}</text>
								<image src="../../static/img/Android1.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="more">
					{{ lock ? '我是有底线的' : loading ? '正在加载中...' : '下划开始加载' }}
				</view>
			</view>
		</scroll-view>
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
	import { reactive,ref,toRefs } from 'vue'
	const state = reactive({
		ImageList: [],
		addList: [],
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
		loading.value = true
		const { data } = await getFetchApi(page)
		state.addList = data
		loading.value = false
		return data
	}
	const tzsp = (videoId) => {
		uni.navigateTo({
			url: '/branch/Details/Details?videoId=' + videoId + ''
		})
	}
	
	// 下拉刷新
	const refresherTriggered = ref(false)
	const refresherrefresh = async () => {
		refresherTriggered.value = true
		await Promise.all([carousel(), Video()])
		refresherTriggered.value = false
		lock.value = false
		page.pageNumber = 1
	}
	const loading = ref(false)
	// 上拉加载
	const page = {
		pageNumber: 1,
		pageSize: 6,
	}
	let lock = ref(false)
	const scrolltolower = async () => {
		if(lock.value || loading.value) {
			return
		}
		page.pageNumber ++
		
		loading.value = true
		const { data } = await getFetchApi(page)

		loading.value = false
		if(!data.length) {
			lock.value = true
			return
		}
		state.addList.push(...data)
	}
	// 点击轮播图跳转
	const carouselMap = ({videoId,url}) => {
		if(videoId) {
			uni.navigateTo({
				url: '/branch/Details/Details?videoId=' + videoId + ''
			})
		} else {
			// 功能关闭
			// plus.runtime.openUrl(url)
		}
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
		height: 100vh;
		display: flex;
		flex-direction: column;
		
		.main {
			flex: 1;
			flex-shrink: 0;
			height: 0;
		}
		// 轮播图
		.carousel {
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
		.more {
			color: #999;
			padding: 12rpx;
			text-align: center;
		}
		// 内容栏
		.content-bar {
			margin-top: 40rpx;
			padding: 0rpx 20rpx;
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
						position: relative;
						height: 191rpx;
						overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
						.icon {
							position: absolute;
							width: 100%;
							height: 30rpx;
							top: 150rpx;
							z-index: 2;
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
						.tsb {
							z-index: 1;
							position: absolute;
							width: 100%;
							height: 50rpx;
							bottom: -50rpx;
							box-shadow: 0rpx -20rpx 40rpx 10rpx rgba(0,0,0,0.9);
							
						}
					}
					.Video-nr {
						width: 100%;
						margin-top: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						.nr {
							padding: 0rpx 20rpx;
						}
						.nr-icon {
							display: flex;
							padding: 0rpx 20rpx;
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
