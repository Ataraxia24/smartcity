<template>
	<view>
		<view class="top">
			<image src="../../static/image/logo.png" mode="aspectFit"></image>
		</view>
		
		<view class="container">
			<view class="rows">
				<view class="image">
					<image src="../../static/icons/lg_phone.png" mode="aspectFit"></image>
				</view>
				<view class="input">
					<input type="text" placeholder="请输入账号" v-model="username" />
				</view>
			</view>
			
			<view class="line"></view>
			
			<view class="rows">
				<view class="image">
					<image src="../../static/icons/lg_phone.png" mode="aspectFit"></image>
				</view>
				<view class="input">
					<input type="text" placeholder="请输入昵称" v-model="nickname" />
				</view>
			</view>
			
			<view class="line"></view>
			
			<view class="rows">
				<view class="image">
					<image src="../../static/icons/lg_phone.png" mode="aspectFit"></image>
				</view>
				<view class="input">
					<input type="text" placeholder="请输入手机号" v-model="phone" />
				</view>
			</view>
			
			<view class="line"></view>
			
			<view class="rows">
				<view class="image">
					<image src="../../static/icons/lg_lock.png" mode="aspectFit"></image>
				</view>
				<view class="input">
					<input type="password" placeholder="请输入密码" v-model="pwd" />
				</view>
			</view>
			
			<view class="line"></view>
		</view>
		
		<button type="primary" style="margin: 50rpx 0;" @click="registerUser()">注册</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				username: '',
				nickname: '',
				phone: '',
				pwd: ''
			};
		},
		methods: {
			registerUser() {
				if (!this.username || !this.nickname || !this.phone || !this.pwd) {
					uni.showToast({
						title: '用户信息不能为空!',
						icon: 'none'
					})
				} else {
					this.$post(api.REGISTER_USER, {
						userName: this.username,
						password: this.pwd,
						phonenumber: this.phone,
						nickName: this.nickname
					}).then(res => {
						uni.showModal({
							title: '提示',
							content: res.msg,
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}
							}
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.line {
		display: flex;
	}
	.line::before,.line::after {
		content: '';
		flex: 1;
		height: 1px;
		background: black;
		align-items: center;
	}
	.top {
		display: flex;
		justify-content: center;
		image {
			width: 60%;
		}
	}
	
	.container {
		display: flex;
		flex-direction: column;
		.rows {
			display: flex;
			.image {
				
				border:1px solid skyblue;
				margin: 10rpx 40rpx;
				display: flex;
				flext: 1;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				
				image {
					width: 80rpx;
					height: 80rpx;
				}
			}
			
			.input {
				flext: 1;
				padding-left: 0 20rpx;
				display: flex;
				padding: 50rpx 0;
				input {
				}
			}
			
		}
	}
</style>
