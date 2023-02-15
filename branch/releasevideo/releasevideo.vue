<template>
	<view class="home">
			<!-- 添加视频 -->
			<view class="tjvideo">
				<view class="imj" @click="uploud">
					<!-- {{ imgUrl }} -->
					<image :src="state.imgUrl" alt=""></image>
					<!-- <image src="../../static/img/c2c00f0cad1b7043b2054ff7d8b17fd.png"></image> -->
				</view>
					<text>点击添加封面图</text>
			</view>
			<!-- 标题 | 分类 | 描述 -->
			<view class="label_describe">
				<!-- 标题 -->
				<view class="label">
					<text>标题</text>
					<input type="text" placeholder="请填写视频标题">
				</view>
				<!-- 分类 -->
				<view class="assort">
					<text>分类</text>
					<input type="text" placeholder="请填写视频标题">
					<view class="dayu">
						<image src="../../static/img/24eace16acea6a1057e0d1f5d1e7467.png"></image>
					</view>
				</view>
				<!-- 描述 -->
				<view class="describe">
					<text>描述</text>
					<textarea 
						placeholder="请填写视频描述" 
						placeholder-class="texts" 
						placeholder-style="color: #333;"
						maxlength="80"
						auto-focus="true"
						bindblur='changeContext'
						></textarea>
				</view>
				<!-- 合集 -->
				<view class="collection">
					<text>合集</text>
					<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
					    <view class="picker">
					      当前选择：{{array[index]}}
					    </view>
					</picker>  
				</view>
			</view>
			<!-- 发布 -->
			<view class="release">
				<view class="release_button">
					<text>发 布</text>
				</view>
			</view>
	</view>
</template>

<script setup>
	// vue3小程序生命周期函数
	import { onShareAppMessage, onLoad, onShow, onHide } from '@dcloudio/uni-app';
	import {reactive,toRefs} from 'vue';
	const state = reactive({
		imgUrl: '',
	})
	const uploud = () => {
		console.log(111);
		wx.chooseMedia({
			count: 1,
			type: 'image',
			success(res) {
				console.log(res);
				uni.uploadFile({
					url: 'http://47.100.96.69:7001/upload/image',
					header: {authorization: uni.getStorageSync('authorization') },
					name: 'file',
					filePath: res.tempFiles[0].tempFilePath,
					success(res) {
						console.log(res);
						const data = JSON.parse(res.data)
						state.imgUrl = data.url
					}
				})
			}
		})
	}
	// 页面加载
	onLoad((message) => {
	
	})
	const bindPickerChange = (e) => {
			console.log('picker发送选择改变，携带值为', e.detail.value)
		      index: e.detail.value
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
	const { array } = toRefs(state)
</script>

<style lang="scss">
	.home {
		width: 100%;
		height: 1008rpx;
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
			height: 521rpx;
			background-color: #FFF;
			.label {
				height: 100rpx;
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
			.assort {
				height: 100rpx;
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
					.dayu {
						line-height: 100rpx;
						margin-left: 135rpx;
						image {
							width: 30rpx;
							height: 30rpx;
						}
					}
			}
			.describe {
				height: 190rpx;
				border-bottom: 3rpx solid #E0E0E0;
				display: flex;
					text {
						line-height: 90rpx;
						font-size: 44rpx;
						font-weight: bold;
					    margin-left: 18rpx;
				}
				textarea {
					flex: 1;
					height: 166rpx;
					font-size: 36rpx;
					margin: 21rpx 30rpx;
					border: 0rpx;
				}
			}
			.collection {
				height: 100rpx;
				display: flex;
				text {
					line-height: 90rpx;
					font-size: 44rpx;
					font-weight: bold;
					margin-left: 18rpx;
				}
				.picker {
					line-height: 90rpx;
					margin-left: 18rpx;
				}
			}
		}
		.release {
			height: 155rpx;
			.release_button {
				width: 700rpx;
				margin: 45rpx 26rpx;
				height: 120rpx;
				background-color: #FF6699;
				border-radius: 100rpx;
				text-align: center;
				 text {
					 line-height: 120rpx;
					 color: #FFF;
				 }
			}
		}
	}
</style>
