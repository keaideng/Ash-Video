<template>
	<!-- 内容栏 -->
	<view class="content" v-for="item in WorkList" :key="item.videoId">
		<view class="content-bar">
			<view class="bar-image">
				<image :src="item.cover" mode=""></image>
			</view>
			<view class="bar-nr">
				<view class="nr-li">{{ item.title }}</view>
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
		<view class="bar-cz">
			<view class="" @click="revise(item.videoId)">修改</view>
			<view class="">视频</view>
			<view class="">删除</view>
		</view>
	</view>
</template>

<script setup>
	// vue3小程序生命周期函数
	import { reactive,toRefs } from 'vue'
	import {
		onShareAppMessage,
		onLoad,
		onShow,
		onHide
	} from '@dcloudio/uni-app';
	import { getWorkApi } from '../../api/modules/login'
	const WorkList = reactive({
		
	})
	// 页面加载
	onLoad((message) => {
	getWork()
	})
	const getWork = async() => {
		const { data } = await getWorkApi()
		Object.assign(WorkList,data.data)
	}
	// 页面显示
	onShow(() => {
	getWork()
	})
	const revise = (videoId) => {
		uni.navigateTo({
			url: '/branch/addvideo/addvideo?videoId= '+ videoId +''
		})
	}
	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
</script>

<style lang="scss">
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
