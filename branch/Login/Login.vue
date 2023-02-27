<template>
	<view class="login">
		<!-- 退出 -->
		<view class="login-quit" @click="quit">
			<image src="../../static/错误.png" mode=""></image>
		</view>
		<!-- 登录 -->
		<view class="login-in">
			<view class="in-bt">欢迎回来</view>
			<view class="search-nav">
				<view class="view">
					<input type="text" placeholder="手机号" v-model="formList.phone" maxlength="11"/>
				</view>
			</view>
			<view class="search-nav">
				<view class="view">
					<input type="password" placeholder="请输入密码" v-model="formList.password" maxlength="16" />
				</view>
			</view>
			<!-- 按钮 -->
			<view class="in-button" @click="AddList">
				登 录
			</view>
			<!-- 社交 -->
			<view class="in-socializing">
				<view class="soci">
					<view class="soci-a" />
					<text>社交账号登录</text>
					<view class="soci-b" />
				</view>
				<view class="ali">
					<view>
						<image src="../../static/wx.png" mode=""></image>
					</view>
					<view>
						<image src="../../static/QQ.png" mode=""></image>
					</view>
					<view>
						<image src="../../static/wb.png" mode=""></image>
					</view>
				</view>
				<view class="zing" @click="lw">注册账号</view>
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
	import { postApi } from '@/api/modules/login.js'
	const state = reactive({
		formList: {
			phone:'',
			password:''
		}
	})
	// 跳转注册
	const lw = () => {
		uni.navigateTo({
			url: '/branch/enroll/enroll'
		})
	}
	// 封装校验
	const encapsulation = () => {
		const { password,phone } = state.formList
		const sj = /^1[3456789]\d{9}$/
		if (!phone) {
			return uni.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
		} else if (!sj.test(phone)) {
			return uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
		}
		if (!password) {
			return uni.showToast({
				title: '密码不能为空',
				icon: 'none'
			})
		} else if (password.length <= 7) {
			return uni.showToast({
				title: '密码长度不能小于8大于16',
				icon: 'none'
			})
		}
	}
	// 登录
	const AddList = async () => {
		encapsulation()
			const res = await postApi(state.formList)
			if(res.statusCode === 200) {
				wx.setStorageSync('authorization', res.data.authorization)
				// 成功跳转首页
				uni.switchTab({ url: '/pages/home/home' })
				return uni.showToast({
					title: '登录成功',
					icon: 'none'
				})
			} else {
				return uni.showToast({
					title: '登录失败',
					icon: 'none'
				})
			}
	}
	// 返回首页
	const quit = () => {
		uni.switchTab({ url: '/pages/home/home' })
	}
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
	const { formList } = toRefs(state)
</script>

<style lang="scss">
	.login {
		padding: 30rpx;

		// 退出按钮
		.login-quit {
			margin-top: 50rpx;
			height: 40rpx;

			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		// 登录
		.login-in {
			height: 700rpx;
			// background-color: sandybrown;

			.in-bt {
				height: 230rpx;
				text-align: center;
				line-height: 300rpx;
				color: #A9A5A0;
				font-size: 40rpx;
				// background-color: chartreuse;
			}

			// 搜索导航
			.search-nav {
				display: flex;
				color: #656771;
				margin-top: 40rpx;

				.view {
					position: relative;
					flex: 1;
					height: 80rpx;
					background-color: #f7f7f7;
					border-radius: 15rpx;
					font-size: 26rpx;

					input {
						width: 100%;
						height: 100%;
						padding: 0rpx 40rpx;
					}
				}
			}

			// 按钮
			.in-button {
				height: 110rpx;
				border-radius: 60rpx;
				text-align: center;
				line-height: 110rpx;
				background-color: #FB7299;
				color: #fff;
				font-size: 40rpx;
				margin-top: 40rpx;
			}

			// 社交
			.in-socializing {
				margin-top: 80rpx;

				.soci {
					position: relative;
					text-align: center;
					color: #A9A5A0;

					.soci-a {
						position: absolute;
						width: 100rpx;
						border-bottom: 2rpx #A9A5A0 solid;
						top: 20rpx;
						left: 140rpx;
					}

					.soci-b {
						position: absolute;
						width: 100rpx;
						border-bottom: 2rpx #A9A5A0 solid;
						top: 20rpx;
						right: 140rpx;
					}
				}

				.ali {
					display: flex;
					height: 120rpx;
					margin-top: 30rpx;
					justify-content: center;

					view {
						width: 120rpx;
						height: 120rpx;
						border-radius: 100%;
						background-color: #f7f7f7;
						margin: 0rpx 40rpx;
						text-align: center;

						image {
							position: relative;
							top: 32rpx;
							width: 60rpx;
							height: 60rpx;
						}
					}
				}

				.zing {
					text-align: center;
					margin-top: 100rpx;
				}
			}
		}
	}
</style>
