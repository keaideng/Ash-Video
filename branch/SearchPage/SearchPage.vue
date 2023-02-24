<template>
	<!-- 搜索栏 -->
	<view class="search-box">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<view class="input">
				<icon type="search" size="13"></icon>
				<input type="text" placeholder="精彩热搜: 湖南众智学院" @confirm="search" v-model="addList.keyWord" :focus="firstFocus" />
			</view>
			<view class="nav" @click="search">
				搜索
			</view>
		</view>
	</view>
	<!-- 内容栏 -->
	<view class="content">
		<view v-if="searchList.length">
			<view class="content-bar" v-for="item in searchList" :key="item.userId">
				<view class="bar-image" @click="tzsp(item.videoId)">
					<image :src="item.cover" mode=""></image>
				</view>
				<view class="bar-nr">
					<view class="nr-li">{{ item.describe}}</view>
					<view class="nr-bf">
						<view class="icon">
							<view class="icon-li">
								<view class="li1">
									<image src="../../static/img/bf.png" mode=""></image>
									<text>{{ item.readCount }}</text>
								</view>
								<view class="li1">
									<image src="../../static/img/dz.png" mode=""></image>
									<text>{{ item.likeCount }}</text>
								</view>
								<view>
									<image src="../../static/img/Android1.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 暂无内容 -->
		<view v-else class="zwnr">暂无内容</view>
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
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		SearchApi
	} from '../../api/modules/categorize'
	const state = reactive({
		addList: {
			keyWord: ''
		},
		searchList: [],
		firstFocus: false
	})

	// 页面加载
	onLoad((message) => {
		state.addList.keyWord = message.name
		if(message.name) {
			search()
		}
	})
	const search = async () => {
		const {
			data
		} = await SearchApi(state.addList)
		state.searchList = data.data
		this.onSearchBtnClick()
	}
	const tzsp = (videoId) => {
		uni.navigateTo({
			url: '/branch/Details/Details?videoId=' + videoId + ''
		})
	}
	// 页面显
	onShow(() => {
		state.firstFocus = true
	})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
	const {
		addList,
		searchList,
		firstFocus
	} = toRefs(state)
</script>

<style lang="scss">
	// 搜索导航
	.search-box {
		background-color: #fff;
		width: 100%;

		.search-nav {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			color: #656771;
			padding: 12rpx 16rpx;
			align-items: center;

			.input {
				flex: 1;
				width: 620rpx;
				background-color: #F6F7F8;
				border-radius: 9999rpx;
				height: 60rpx;
				font-size: 26rpx;
				padding: 0 12rpx;
				display: flex;
				align-items: center;
				input {
					width: 100%;
					height: 100%;
					padding: 0rpx 0rpx;
				}
				icon {
					margin: 0 12rpx;
				}
			}

			.nav {
				margin-left: 12rpx;
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
				height: 169rpx;
				border-radius: 25rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
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

		.zwnr {
			text-align: center;
			margin-top: 200rpx;
		}
	}
</style>
