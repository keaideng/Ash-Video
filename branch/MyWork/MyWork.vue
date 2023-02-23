<template>
	<!-- 内容栏 -->
	<scroll-view class="main" scroll-y refresher-enabled :refresher-triggered="refresherTriggered" @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
		<view class="content" v-for="item in WorkList" :key="item.videoId">
			<view class="content-bar" @click="videoDetails(item.videoId, item.state)">
				<view class="bar-image">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="bar-nr">
					<view class="nr-li">{{ item.title }}</view>
					<view class="nr-bf">
						<view class="icon">
							<view class="icon-li">
								<view class="li1">
									<image src="../../static/img/bf.png" mode=""></image>
									<text>{{ item.readCount }}</text>
								</view>
								<view class="li1">
									<image src="../../static/zd.png" mode=""></image>
									<text>{{ item.likeCount }}</text>
								</view>
								<view>
									<image src="../../static/img/Android.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bar-cz">
				<view class="" @click="revise(item.videoId)">修改</view>
				<view class="">{{ lw[item.state] }}</view>
				<view class="" @click="adelete(item.videoId)">删除</view>
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
		reactive,
		toRefs,
		ref
	} from 'vue'
	import {
		onShareAppMessage,
		onLoad,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import {
		getWorkApi
	} from '../../api/modules/login'
	import { Delete } from '../../api/modules/categorize'
	const WorkList = ref([])
	const lw = ['草稿', '待审核', '已发布']
	// 页面加载
	onLoad((message) => {
		getWork()
	})
	const getWork = async () => {
		const {
			data
		} = await getWorkApi(page)
		WorkList.value = data.data
	}
	// 页面显示
	onShow(() => {
		getWork()
	})
	// 下拉刷新
	const refresherTriggered = ref(false)
	const refresherrefresh = async () => {
		refresherTriggered.value = true
		await getWork()
		refresherTriggered.value = false
		lock.value = false
		page.pageNumber = 1
	}
	const loading = ref(false)
	const page = {
		pageNumber: 1,
		pageSize: 6,
	}
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
		} = await getWorkApi(page)
		loading.value = false
		if(!data.data.length) {
			lock.value = true
			return
		}
		WorkList.value.push(...data.data)
	}
	const revise = (videoId) => {
		uni.navigateTo({
			url: '/branch/addvideo/addvideo?videoId=' + videoId + ''
		})
	}
	const videoDetails = (videoId, state) => {
		if (state <= 2) return
		uni.navigateTo({
			url: '/branch/Details/Details?videoId=' + videoId + ''
		})
	}
	// 删除
	const adelete = async (videoId) => {
		await Delete({videoId})
		getWork()
	}
	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
</script>

<style lang="scss">
	.main {
		height: 100vh;
		flex: 1;
		flex-shrink: 0;
	}
	.more {
		color: #999;
		padding: 12rpx;
		text-align: center;
	}
	// 内容栏
	.content {
		margin-top: 20rpx;

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

				image {
					width: 320rpx;
					height: 180rpx;
				}
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

		.bar-cz {
			height: 100rpx;
			border-bottom: 10px solid #f5f5f4;
			display: flex;
			line-height: 100rpx;

			view {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
