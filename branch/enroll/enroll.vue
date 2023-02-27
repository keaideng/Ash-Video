<template>
	<view class="login">
		<!-- 退出 -->
		<view class="login-quit">
			<image src="../../static/错误.png" mode=""></image>
		</view>
		<!-- 登录 -->
		<view class="login-in">
			<view class="in-bt">注册</view>
			<view class="search-nav">
				<view class="view">
					<input type="text" placeholder="昵称" v-model="ListAdd.nickname" maxlength="16" />
				</view>
			</view>
			<view class="search-nav">
				<view class="view">
					<input type="text" placeholder="手机号" v-model="ListAdd.phone" maxlength="11" />
				</view>
			</view>
			<view class="search-nav">
				<view class="view">
					<input type="text" placeholder="获取验证码" v-model="ListAdd.code" maxlength="6" />
				</view>
				<view :class="{ yxm : show }" class="nav-yzm" @click="Captcha"> {{ !show ? '验证码' : sum + '秒' }} </view>
			</view>
			<view class="search-nav">
				<view class="view">
					<input type="password" placeholder="请输入密码" v-model="ListAdd.password" maxlength="16" />
				</view>
			</view>
			<!-- 按钮 -->
			<view class="in-button" @click="LoginAdd">
				注 册
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
	import {
		loginApi,
		CaptchaApi
	} from '@/api/modules/login.js'
	const state = reactive({
		sum: 60,
		show: false,
		ListAdd: {
			nickname: '',
			password: '',
			phone: '',
			code: ''
		}
	})
	// 页面加载
	onLoad((message) => {

	})
	// 获取验证码
	const Captcha = async () => {
		const sj = /^1[3456789]\d{9}$/
		if (!state.ListAdd.phone) {
			return uni.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
		} else if (!sj.test(state.ListAdd.phone)) {
			return uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
		}
		if (state.show) return
		state.show = true
		const id = setInterval(() => {
			state.sum--
			if (state.sum == 0) {
				state.show = false
				state.sum = 60
				clearInterval(id)
			}
		}, 1000)
		const {
			data
		} = await CaptchaApi(state.ListAdd.phone)
		console.log(data.code)
		// state.ListAdd.code = res.data.code
	}
	// 校验封装
	const encapsulation = () => {
		const {
			nickname,
			phone,
			code,
			password
		} = state.ListAdd
		const sj = /^1[3456789]\d{9}$/
		// 判断不能为空
		if (!nickname) {
			uni.showToast({
				title: '昵称不能为空',
				icon: 'none'
			})
		} else if (nickname.length < 1 || nickname.length > 16) {
			uni.showToast({
				title: '昵称长度不能小于2大于16',
				icon: 'none'
			})
		} else if (!phone) {
			uni.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
		} else if (!sj.test(phone)) {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
		} else if (!code) {
			 uni.showToast({
				title: '验证码不能为空',
				icon: 'none'
			})
		} else if (!password) {
			uni.showToast({
				title: '密码不能为空',
				icon: 'none'
			})
		} else if (password.length < 7 || password.length > 16) {
			uni.showToast({
				title: '密码长度不能小于8大于16',
				icon: 'none'
			})
		} else {
			return true
		}
	}
	// 注册 
	const LoginAdd = async () => {
		const b = encapsulation()
		if (b) {
			console.log(11)
			const {
				statusCode
			} = await loginApi(state.ListAdd)
			if (statusCode === 200) {
				uni.navigateTo({
					url: '/branch/Login/Login',
				})
				uni.showToast({
					title: '注册成功',
					icon: 'none'
				})
			}
		}

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
	const {
		sum,
		show,
		ListAdd
	} = toRefs(state)
</script>

<style lang="scss">
	.login {
		padding: 20rpx;

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
				height: 150rpx;
				text-align: center;
				line-height: 150rpx;
				color: #A9A5A0;
				font-size: 40rpx;
				// background-color: chartreuse;
			}

			// 搜索导航
			.search-nav {
				display: flex;
				color: #656771;
				margin-top: 40rpx;

				.nav-yzm {
					color: #fff;
					width: 150rpx;
					height: 80rpx;
					background-color: #FB7299;
					line-height: 80rpx;
					text-align: center;
					border-radius: 0rpx 15rpx 15rpx 0rpx;
				}

				.yxm {
					background-color: #f0f0f0;
					color: #000 !important;
					box-sizing: border-box;
					border-left: 1rpx solid #ccc;
				}

				.view {
					position: relative;
					flex: 1;
					height: 80rpx;
					background-color: #f7f7f7;
					border-radius: 5rpx;
					font-size: 26rpx;
					border-radius: 15rpx;

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
			}
		}
	}
</style>
