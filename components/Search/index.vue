<template>
	<view>
		<!-- 搜索导航 -->
		<view class="search-nav">
			<navigator url="../../branch/SearchPage/SearchPage">
				<icon type="search" size="13"></icon>
				<text>精彩热搜: 湖南众智学院</text>
			</navigator>
			<view class="nav">
				<slot></slot>
			</view>
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
				text {
					position: absolute;
					top: -20rpx;
					left: 50rpx;
				}
			}
			.nav {
				position: relative;
				top: 14rpx;
			}

			
		}
</style>