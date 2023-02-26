<template>
	<scroll-view class="xfq" scroll-y refresher-enabled :refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower" >
	<!-- 内容栏 -->
	<view class="content">
		<view class="content-bar" v-for="item in ListHistory" :key="item.id">
			<view class="bar-image" @click="zha(item.videoId)">
				<image :src="item.cover" mode=""></image>
			</view>
			<view class="bar-nr">
				<view class="nr-li">{{ item.title }}</view>
				<view class="nr-bf">
					<view class="icon">
						<view class="icon-li">
							<view class="li1">
								<image src="../../static/img/bf.png" mode=""></image>
								<text>{{ item.likeCount }}</text>
							</view>
							<view class="li1">
								<image src="../../static/zd.png" mode=""></image>
								<text>{{ item.readCount }}</text>
							</view>
							<view>
								<image src="../../static/img/Android.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="more">
		{{ lock ? '我是有底线的' : loading ? '正在加载中...' : '下划开始加载' }}
	</view>
	</scroll-view>
</template>

<script setup>
	// vue3小程序生命周期函数
	import {
		onShareAppMessage,
		onLoad,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import { ref } from 'vue'
	import { GetLike } from '../../api/modules/history'
	const ListHistory = ref([])
	// 页面加载
	const page = {
		pageNumber: 1,
		pageSize: 10,
	}
	onLoad(async (message) => {
		lw()
	})
	const lw = async () => {
		const { data } = await GetLike(page)
		if(data.total === data.data.length) lock.value = true
		ListHistory.value = data.data
		console.log(data)
	}
	// 下拉刷新
	const refresherTriggered = ref(false)
	const refresherrefresh = async () => {
		page.pageNumber = 1
		refresherTriggered.value = true
		await lw()
		refresherTriggered.value = false
		lock.value = false
		
	}
	const loading = ref(false)
	// 上拉加载
	let lock = ref(false)
	const scrolltolower = async () => {
		if(lock.value || loading.value) {
			return
		}
		page.pageNumber ++
		loading.value = true
		const {
			data
		} = await GetLike(page)
		loading.value = false
		if(!data.data.length) {
			lock.value = true
			return
		}
		WorkList.value.push(...data.data)
	}
	const zha = (videoId) => {
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
</script>

<style lang="scss">
	.xfq{
		height: 100vh;
	}
	.more {
		color: #999;
		padding: 12rpx;
		text-align: center;
	}
	// 内容栏
	.content {
		.content-bar {
			padding: 20rpx;
			height: 180rpx;
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