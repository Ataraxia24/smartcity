<template>
	<view>
		<view class="user">
			<!-- 头像 -->
			<view class="avatar">
				<image :src="avatar"></image>
			</view>
			<uni-list>
				<uni-list-item title="个人信息" showArrow="true" to="setting"></uni-list-item>
				<uni-list-item title="修改密码" showArrow="true" to="modifypwd"></uni-list-item>
				<uni-list-item title="意见反馈" showArrow="true" to="feedback"></uni-list-item>
			</uni-list>
			<view class="button">
				<button type="primary" @click="exit()">退出</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				baseurl: api.SERVER_BASE,
				avatar:'/static/image/person.jpg'
			};
		},
		onShow() {
			let image = uni.getStorageSync('avatar')
			console.log(image)
			if (image) {
				this.avatar = this.baseurl + '/prod-api' + image
				console.log(this.avatar)
			} else {
				this.avatar = '/static/image/person.jpg'
			}
		},
		onLoad() {
			
			this.getUserInfo()
		},
		methods: {
			//这里暂时通过请求获取数据, 一般在登录后存入本地存储
			getUserInfo() {
				var user = uni.getStorageSync('userInfo')
				this.avatar = user.avatar
			},
				exit() {
					uni.removeStorage({
						key: 'token',
						success: (res) => {
										
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					})
			}
		}
		
	}
</script>

<style lang="scss">
	.user {
		margin: 10rpx 5rpx;
	}
	.avatar {
		display: flex;
		justify-content: center;
		margin-left: 100px;
		width:100px;
		height: 100px;
		border-radius: 50%;
		overflow: hidden;
		image {
			width:100%;
			height:100%;
		}
	}
</style>
