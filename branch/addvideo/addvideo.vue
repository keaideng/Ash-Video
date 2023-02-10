<template>
	<view class="hmde">
	  <view class="home">
		<!-- 添加视频 -->
		<view class="tjvideo">
			<view class="imj">
				<image src="../../static/img/c2c00f0cad1b7043b2054ff7d8b17fd.png"></image>
			</view>
			<text>点击添加视频</text>
		</view>
		<!-- 标题 | 描述 -->
		<view class="label_describe">
			<!-- 标题 -->
			<view class="label">
				<text>标题</text>
				<input type="text" placeholder="请填写视频标题">
			</view>
			<!-- 描述 -->
			<view class="describe">
				<text>描述</text>
				<input type="text" placeholder="请填写视频描述">
			</view>
		</view>
		<!-- 完成 | 删除 -->
		<view class="complete_delete">
			<!-- 完成 -->
			<view class="complete">
				<text>完成</text>
			</view>
			<!-- 删除 -->
			<view class="delete">
				<text>删除</text>
			</view>
		</view>
		<view class="bottom"></view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.hmde {
		height: 1182rpx;
		background-color: #F0F0F0;
	}
	.home {
		width: 100%;
		height: 864rpx;
		.tjvideo {
			height: 336rpx;
			// background-color: #F0F0F0;
			background-color: #F8F8F8;
			text-align: center;
			text {
				line-height: 420rpx;
				    font-size: 32rpx;
				    color: grey;
			}
			.imj {
				position: absolute;
				    padding: 100rpx 345rpx;
					image {
						width: 58rpx;
						height: 58rpx;
					}
			}
		}
		.label_describe {
			height: 431rpx;
			background-color: #FFF;
			.label {
				height: 90rpx;
				border-bottom: 3rpx solid #E0E0E0;
				display: flex;
				text {
					line-height: 90rpx;
					font-size: 44rpx;
					font-weight: bold;
				    margin-left: 18rpx;
				}
				input {
					font-size: 36rpx;
					margin: 21rpx 30rpx;
					border: 0rpx;
				}
			}
			.describe {
				height: 341rpx;
				display: flex;
					text {
						line-height: 90rpx;
						font-size: 44rpx;
						font-weight: bold;
					    margin-left: 18rpx;
				}
				input {
					font-size: 36rpx;
					margin: 21rpx 30rpx;
					border: 0rpx;
				}
			}
		}
		.complete_delete {
			height: 100rpx;
			background-color: lightcoral;
			display: flex;
			border-top: 3rpx solid #E0E0E0;
			.complete {
				width: 375rpx;
				height: 100rpx;
				background-color: sandybrown;
				text-align: center;
				background-color: #FF6699;
				text {
					line-height: 100rpx;
					font-size: 36rpx;
					color: #FFF;
				}
			}
			.delete {
				width: 375rpx;
				height: 100rpx;
				background-color: lawngreen;
				text-align: center;
				background-color: #FFF;
				text {
					line-height: 100rpx;
					font-size: 36rpx;
				}
			}
		}
	}
	.bottom {
		height: 17rpx;
		background-color: #E8E8E8;
	}
</style>
