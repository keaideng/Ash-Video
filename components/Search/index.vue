<template>
	<view class="search-box">
		<!-- 搜索导航 -->
		<view class="search-nav">
			<view class="input" @click="toSearch">
				<icon type="search" size="13"></icon>
				<text>精彩热搜: 湖南众智学院</text>
			</view>
			<view class="nav" v-if="classify" @click="toClassify">
				分类
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Search",
		data() {
			return {

			};
		},
		props: {
			classify: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/branch/SearchPage/SearchPage'
				})
			},
			toClassify() {
				uni.switchTab({
					url: '/pages/classify/classify'
				})
			}
		}
	}
</script>

<style lang="scss">
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

				icon {
					margin: 0 12rpx;
				}
			}
			
			.nav {
				margin-left: 12rpx;
			}
		}
	}
</style>
