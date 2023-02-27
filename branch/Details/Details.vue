<template>
	<view class="details">
		<view class="details-Play">
			<video :src="demandList.videoUrl" @timeupdate="timeUpdate" enable-danmu :danmu-list="demandList.bulletList"
				id="vid" controls danmu-btn></video>
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
			<!-- 简介 -->
			<view class="content-jj" v-if="show">
				<view class="jj-yh">
					<view class="yh-tx">
						<image :src="demandList.user.avatar" mode=""></image>
						<view class="sp-jj">
							<text>{{ demandList.title }}</text>
						</view>
					</view>
					<view class="yh-bf">
						<view class="bf-sl">
							<image src="../../static/sp.png" mode=""></image>
							<text>{{ demandList.readCount }}</text>
							<image src="../../static/zd.png" mode="" @click="Like" v-if="!demandList.isLike"></image>
							<image src="../../static/zd1.png" mode="" @click="Like" v-else></image>
							<text>{{ demandList.likeCount }}</text>
						</view>
						<view class="bf-sc" @click="danmu = true">
							<image src="../../static/danmu.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="yh-xj">
					<text>{{ demandList.describe }}</text>
				</view>
				<!-- <view class="yh-xj">
					<view class="xj1">选集</view>
					<view class="xj2">
						<text>共0集</text>
						<image src="../../static/右箭头.png" mode=""></image>
					</view>
				</view> -->
				<view class="pl-danmu" v-if="danmu">
					<view class="pl-comments comments">
						<view class="comments-input">
							<input type="text" v-model="state.dm">
						</view>
						<view class="comments-fb" @click="barrage">弹幕</view>
					</view>
				</view>
			</view>
			<!-- 评论 -->
			<view class="content-pl" v-else>
				<view class="pl-comments">
					<view class="comments-input">
						<input type="text" v-model="text">
					</view>
					<view class="comments-fb" @click="publish(demandList.videoId)">发布</view>
				</view>
				<view class="pl-reply" v-for="item,index in appList" :key="item.commentId" v-if="!item">
					<view class="reply-tx">
						<image :src="item.user.avatar" mode=""></image>
					</view>
					<view class="reply-hf">
						<view class="hf">
							<view class="hf-mz">{{item.user.nickname}}</view>
							<view class="sj1">{{ toDate(item.createdAt) }}</view>
						</view>


						<view class="hf-nr">
							<!-- <view class="nr-sj">
								
								<view class="sj2">
									<image src="../../static/img/点赞 (1).png" mode=""></image>
									<text>1323</text>
								</view>
								<view class="sj3">回复</view>
							</view> -->
							<view class="nr-lgm" @click="Replycomments(item.commentId)">{{ item.text }}</view>
							<view class="nr-rp">
								<view class="rp">热议</view>
								<view class="rp1">UP主觉得很赞</view>
							</view>
						</view>
						<view class="hf-ments" v-if="item.topReply">
							<view class="ments" v-if="item.topReply && !item.moreShow">
								<text class="ments-zm">{{ item.user.nickname }}</text>
								<text>:</text>
								<text class="ments-nr">{{ item.topReply.text }}</text>
							</view>
							<view class="ments-hf" v-if="item.moreShow">
								<view v-for="item in item.moreList" :key="item.commentId">
									<text class="ments-zm">{{ item.user.nickname }}</text>
									<text class="hf">回复</text>
									<text class="ments-zm">{{ item.replyUser.nickname }}</text>
									<text>:</text>
									<text class="ments-nr">{{ item.text }}</text>
								</view>
							</view>

							<view class="more" @click="dianMore(item)" v-if="item.topReply">
								<txte>更多</txte>
							</view>
						</view>
					</view>
				</view>
				<view class="reply-zw" v-if='demandList'>
					<text>暂时无评论</text>
				</view>
				<view class="pl-comments comments" v-if="sum">
					<view class="comments-input">
						<input type="text" v-model="comst">
					</view>
					<view class="comments-fb" @click="comments">回复</view>
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
	import dayjs from "dayjs"
	import {
		reactive,
		ref,
		toRefs
	} from 'vue';
	const state = reactive({
		show: true,
		sum: false,
		danmu: false,
		demandList: {
		user: {}
		},
		text: '',
		replyId: '',
		comst: '',
		appList: {},
		moreShow: false,
		moreList: {},
		dm: ''
	})
	import {
		VideoDetails,
		getReviews,
		postComts,
		getReply,
		postReply,
		postLike,
		deleteCancel,
		postBarrage
	} from '../../api/modules/upload.js'

	let videoCtx

	// 页面加载
	onLoad((message) => {
		videoCtx = wx.createVideoContext('vid')
		GetData(message.videoId)
		Onlinedemand(message.videoId)

	})
	// 获取数据
	const GetData = async (videoId) => {
		const {
			data
		} = await VideoDetails({
			videoId
		})
		state.demandList = data.data
	}
	// 获取回复评论
	const Reply = async (commentId) => {
		const {
			data
		} = await getReply({
			commentId
		})
	}
	// 获取评论
	const Onlinedemand = async (videoId) => {
		const {
			data
		} = await getReviews({
			videoId
		})
		state.appList = data.data
	}
	// 发布回复评论
	const Replycomments = (replyId) => {
		state.sum = true
		state.replyId = replyId
		Onlinedemand(state.demandList.videoId)
	}
	const comments = async () => {
		const {
			replyId,
			comst
		} = state
		const text = comst
		await postReply({
			replyId,
			text
		})
		state.sum = false
		state.comst = ''
		Replycomments(state.replyId)
	}
	// 更多回复
	const dianMore = async (item) => {
		item.moreShow = true
		const {
			data
		} = await getReply({
			commentId: item.commentId
		})
		item.moreList = data.data
	}
	// 发布评论
	const publish = async (videoId) => {
		const text = state.text
		const token = uni.getStorageSync('authorization')
		if (!token) {
			return uni.showToast({
				title: '未登录',
				icon: 'error'
			})
		} else if (text) {
			await postComts({
				videoId,
				text
			})
		} else {
			return uni.showToast({
				title: '评论不能为空',
				icon: 'none'
			})
		}
		state.text = ''
		Onlinedemand(state.demandList.videoId)
	}

	function toDate(s) {
		return dayjs(s).format('YYYY-MM-DD hh:mm:ss')
	}
	// 点赞
	const Like = async () => {
		const token = uni.getStorageSync('authorization')
		if (!token) {
			return uni.showToast({
				title: '未登录',
				icon: 'error'
			})
		} else
		if (!state.demandList.isLike) {
			await postLike({
				videoId: state.demandList.videoId
			})
			state.demandList.isLike = 1
			state.demandList.likeCount += 1
		} else {
			await deleteCancel({
				videoId: state.demandList.videoId
			})
			state.demandList.isLike = 0
			state.demandList.likeCount -= 1
		}
	}
	let currentTime = 0
	const timeUpdate = (e) => {
		currentTime = e.detail.currentTime
	}
	// 发送弹幕
	const barrage = async () => {
		const token = uni.getStorageSync('authorization')
		if (!token) {
			return uni.showToast({
				title: '未登录',
				icon: 'error'
			})
		} else {
			videoCtx.sendDanmu({
				text: state.dm
			})
			const res = await postBarrage({
				videoId: state.demandList.videoId,
				text: state.dm,
				time: Math.floor(currentTime)
			})
			state.dm = ''
		}

	}
	// 页面显示
	onShow(() => {})

	// 页面隐藏
	onHide(() => {

	})

	// 页面分享(不定义该函数 页面将无法分享)
	onShareAppMessage(() => {

	})
	const {
		show,
		demandList,
		text,
		sum,
		comst,
		appList,
		danmu
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
							font-size: 32rpx;
							margin-left: 20rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							display: -webkit-box;
							-webkit-box-orient: vertical;
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
								height: 40rpx;
								margin-top: 20rpx;
								margin-left: 10rpx;
							}

							text {
								margin: 0rpx 10rpx;
								color: #A9A5A0;
							}
						}

						.bf-sc {
							text-align: center;
							width: 50rpx;
							border-radius: 15rpx;
							color: #fff;

							image {
								width: 40rpx;
								height: 40rpx;
							}
						}
					}
				}

				.yh-xj {
					display: flex;
					height: 170rpx;
					margin-top: 20rpx;
					padding: 0rpx 40rpx;
					font-size: 28rpx;
					color: #666;

					.xj1 {
						flex: 1;
					}

					.xj2 {
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

				.pl-reply {
					display: flex;
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

						.hf {
							display: flex;
							align-items: center;

							.hf-mz {
								flex: 1;
								height: 55rpx;
								line-height: 55rpx;
								font-size: 30rpx;
								color: #FF6699;
							}

							.sj1 {
								color: #9499a0;
								font-size: 20rpx;
							}

						}

						.hf-nr {
							view {
								margin-top: 10rpx;
							}

							.nr-lgm {
								margin-top: 0rpx;
								font-size: 30rpx;
							}

							.nr-sj {
								color: #9499a0;
								font-size: 20rpx;
								display: flex;
								margin-top: 0rpx;

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
							padding: 20rpx;
							background-color: #f1f1f1;

							.more {
								txte {
									color: #9499a0;
								}
							}

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

		.reply-zw {
			width: 100%;
			text-align: center;
			margin-top: 100rpx;
		}

		.pl-danmu {
			padding: 20rpx;

		}

		.pl-comments {
			width: 100%;
			display: flex;
			line-height: 130rpx;

			.comments-input {
				flex: 1;
				padding: 40rpx 10rpx;
				background-color: #f1f2f3;

			}

			.comments-fb {
				text-align: center;
				width: 120rpx;
				height: 130rpx;
				background-color: #00AEEC;
				color: #fff;
			}
		}

		.comments {
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #ffffff;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);

			input {
				width: 570rpx;
			}
		}

	}
</style>
