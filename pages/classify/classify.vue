<template>
	<view class="home">
		<view class="search-nav">
			<Search></Search>
		</view>
	</view>
	<!-- 全部分类 -->
	<view class="allsort">
		<view class="sort">
			<text>全部分类</text>
		</view>
		<view class="qb" >
			<view class="qb_item" v-for="item,index in addList" :key="index" @click="lw(item.name)">
				<view>
					<image :src='item.icon'></image>
				</view>
				<text>{{ item.name }}</text>
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
	import Search from "../../components/Search/index.vue"
	import { reactive,toRefs } from 'vue'
	import { cationApi } from '../../api/modules/categorize'
	const state = reactive({
		addList: {}
	})
	const lw = (name) => {
		uni.navigateTo({
			url: '/branch/SearchPage/SearchPage?name= '+ name +''
		})
	}
	// 页面加载
	onLoad( async(message) => {
		const { data } = await cationApi()
		state.addList = data.data
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
	const { addList } = toRefs(state)
</script> 

<style lang="scss">
	.home {
		padding: 0rpx 20rpx;
	}
	.search-nav {
		display: flex;
		margin-top: 10rpx;
		color: #656771;

		text {
			margin: 20rpx 0rpx 0rpx 10rpx;
		}
	}
	.allsort {
		.sort {
			width: 100%;
			height: 70rpx;
			padding: 20rpx 20rpx;
			text {
				font-weight: bold;
				font-size: 40rpx;
				margin-left: 14rpx;
			}
		}
		.qb {
			width: 100%;
			// height: 272rpx;
			// height: 225rpx;
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			text-align: center;
			.qb_item {
				width: 170rpx;
				height: 200rpx;
				margin: 9rpx;
				image {
					width: 100rpx;
					height: 100rpx;	
				}
				text {
					font-size: 32rpx;
					color: #656771;
					margin-left: 10rpx;
				}
			}
		}
		.bq {
			width: 100%;
			height: 200rpx;
			margin-left: 54rpx;
			display: flex;
			.bq_item {
				width: 160rpx;
				height: 267rpx;
				margin: 9rpx;
				image {
					width: 100rpx;
					height: 100rpx;	
					margin-right: 54rpx;
				}
				text {
					font-size: 38rpx;
					color: #656771;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
