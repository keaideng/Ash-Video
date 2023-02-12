<template>
	<view class="details">
		<view class="details-Play">
			<video src="http://rpr4o1nwc.hd-bkt.clouddn.com/video/34C18AbugYCvHMQIgY21I.mp4" controls></video>
		</view>
		<view class="details-content">
			<view class="content">
				<view @click="show = true">
					<text :class="{cont : show}">简介</text>
				</view>
				<view @click="show = false">
					<text :class="{cont : !show}">评论</text>
				</view>
			</view>
			<view class="content-jj" v-if="show">
				<view class="jj-yh">
					<view class="yh-tx">
						<image src="../../static/图1.jpg" mode=""></image>
						<text>0 粉丝</text>
					</view>
					<view class="yh-bf">
						<view class="bf-sl">
							<image src="../../static/视频.png" mode=""></image>
							<text>0</text>
							<image src="../../static/img/播放.png" mode=""></image>
							<text>0</text>
						</view>
						<view class="bf-sc">收藏</view>
					</view>
				</view>
				<view class="yh-xj">
					<view class="xj1">选集</view>
					<view class="xj2">
						<text>共0集</text>
						<image src="../../static/右箭头.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="content-pl" v-else>
				<view class="pl-comments">
					<view class="comments-input">
						<input type="text">
					</view>
					<view class="comments-fb">发布</view>
				</view>
				<view class="pl-reply">
					<view class="reply-tx">
						<image src="../../static/图1.jpg" mode=""></image>
					</view>
					<view class="reply-hf">
						<view class="hf-mz">小番茄</view>
						<view class="hf-nr">
							<view class="">这句话我已经说太多次了.jpg</view>
							<view class="nr-sj">
								<view class="sj1">2023-02-05 02:15</view>
								<view class="sj2">
									<image src="../../static/img/点赞 (1).png" mode=""></image>
									<text>1323</text>
								</view>
								<view class="sj3">回复</view>
							</view>
							<view class="nr-rp">
								<view class="rp">热议</view>
								<view class="rp1">UP主觉得很赞</view>
							</view>
						</view>
						<view class="hf-ments">
							<view class="ments">
								<text class="ments-zm">小番茄</text>
								<text>:</text>
								<text class="ments-nr">爱上对方过后就哭了</text>
							</view>
							<view class="ments-hf">
								<text class="ments-zm">小铁</text>
								<text class="hf">回复</text>
								<text class="ments-zm">小番茄</text>
								<text>:</text>
								<text class="ments-nr">我哭了</text>
							</view>
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
	import {
		reactive,
		toRefs
	} from 'vue';
	const state = reactive({
		show: false
	})
	// 页面加载
	onLoad((message) => {

	})

	// 页面显示
	onShow(() => {

	})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
	const {
		show
	} = toRefs(state)
</script>

<style lang="scss">
	.details {
		.details-Play {
			video {
				width: 100%;
				height: 500rpx;
			}
		}

		.details-content {
			.content {
				display: flex;
				height: 100rpx;
				border-bottom: 1rpx solid #f1f1f1;
				line-height: 100rpx;

				view {
					text-align: center;
					width: 50%;
					font-size: 35rpx;

					text {
						display: inline-block;
						height: 97rpx;
					}

					.cont {
						color: #FB7299;
						border-bottom: 3rpx solid #FB7299;
					}
				}
			}

			.content-jj {
				.jj-yh {
					height: 220rpx;
					border-bottom: 1rpx solid #f1f1f1;

					.yh-tx {
						display: flex;
						height: 140rpx;
						line-height: 140rpx;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							margin-top: 20rpx;
							margin-left: 40rpx;
						}

						text {
							margin-left: 30rpx;
							color: #A9A5A0;
						}
					}

					.yh-bf {
						display: flex;
						height: 80rpx;
						line-height: 80rpx;
						padding: 0rpx 40rpx;

						.bf-sl {
							flex: 1;
							display: flex;

							image {
								width: 40rpx;
								height: 30rpx;
								margin-top: 26rpx;
								margin-left: 10rpx;
							}

							text {
								margin: 0rpx 10rpx;
								color: #A9A5A0;
							}
						}

						.bf-sc {
							text-align: center;
							width: 110rpx;
							background-color: #FB7299;
							border-radius: 15rpx;
							color: #fff;
						}
					}
				}

				.yh-xj {
					display: flex;
					height: 170rpx;
					line-height: 170rpx;
					padding: 0rpx 40rpx;
					border-bottom: 1rpx solid #f1f1f1;
					font-size: 38rpx;
					font-weight: bold;
					.xj1{
						flex: 1;
					}
					.xj2{
						color: #A9A5A0;
						image {
							width: 30rpx;
							height: 30rpx;
							margin-left: 20rpx;
						}
					}
				}
			}
			.content-pl {
				padding: 20rpx;
				.pl-comments {
					display: flex;
					height: 100rpx;
					line-height: 100rpx;
					.comments-input {
						flex: 1;
						padding: 30rpx 10rpx;
						background-color: #f1f2f3;

					}
					.comments-fb {
						text-align: center;
						width: 120rpx;
						height: 100rpx;
						background-color: #00AEEC;
						color: #fff;
					}
				}
				.pl-reply {
					display: flex;
					height: 400rpx;
					margin-top: 20rpx;
					.reply-tx {
						width: 100rpx;
						height: 100%;
						margin-right: 10rpx;
						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}
					}
					.reply-hf {
						flex: 1;
						.hf-mz {
							height: 55rpx;
							line-height: 55rpx;
						}
						.hf-nr {
							view {
								margin-top: 10rpx;
							}
							.nr-sj {
								color: #9499a0;
								font-size: 28rpx;
								display: flex;
								.sj2 {
									display: flex;
									margin-left: 20rpx;
									image {
										width: 30rpx;
										height: 30rpx;
										margin-right: 10rpx;
									}
								}
								.sj3 {
									margin-left: 50rpx;
								}
							}
						.nr-rp {
							display: flex;
							font-size: 19rpx;
							view {
								text-align: center;
								margin-right: 20rpx;
								height: 30rpx;
							}
							.rp {
								width: 70rpx;
								background-color: #FFECF1;
								color: #FF6699;
							}
							.rp1 {
								width: 150rpx;
								background-color: #f4f4f4;
								color: #757575
							}
						}
						}
						.hf-ments {
							margin-top: 20rpx;
							height: 200rpx;
							padding: 20rpx;
							background-color: #f1f1f1;
							.ments {
								.ments-zm {
									color: #00AEEC;
									font-weight: bold;
								}
								.ments-nr {
									margin-left: 20rpx;
								}
							}
							.ments-hf {
								margin-top: 10rpx;
								.hf {
									margin-left: 10rpx;
									margin-right: 10rpx;
								}
								.ments-zm {
									color: #00AEEC;
									font-weight: bold;
								}
								.ments-nr {
									margin-left: 20rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
