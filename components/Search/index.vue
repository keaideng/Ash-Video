<template>
	<view>
		<!-- 搜索导航 -->
		<view class="search-nav">
			<navigator url="../../branch/SearchPage/SearchPage">
				<icon type="search" size="13"></icon>
				<text>精彩热搜: 湖南众智学院</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.search-nav {
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
</style>