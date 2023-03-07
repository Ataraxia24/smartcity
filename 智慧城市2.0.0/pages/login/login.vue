<template>
	<view class="login">
		<view class="content">
			<view class="logo">
				<image src="../../static/image/logo.png" mode="widthFix"></image>
			</view>
				
				<view class="box">
					<view class="icon">
						<image src="../../static/icons/lg_phone.png" mode="widthFix"></image>
					</view>
					
					<view class="text">
						<input type="text" placeholder="请输入账号" v-model="username"/>
					</view>
				</view>
				
				<view class="box">
					<view class="icon">
						<image src="../../static/icons/lg_lock.png" mode="widthFix"></image>
					</view>
					
					<view class="text">
						<input type="safe-password" password="true" placeholder="请输入密码" v-model="password"/>
					</view>
				</view>
				
			<navigator url="../register/register.vue">
				<view class="loginRegister" @click="register()">暂无账号,请注册</view>
			
			</navigator>
		</view>
		
		<button type="primary" @click="onclick()">登录</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				username: '',
				password: ''
			};
		},
		methods: {
			onclick() {
				if (this.username.length == 0) {
					uni.showToast({
						title: '账户不能为空!',
						icon:'none'
					})
				} else if (this.password.length == 0) {
					uni.showToast({
						title: '密码不能为空!',
						icon:'none'
					})
				} else {
					this.$post(api.USER_LOGIN, {
						username: this.username,
						password: this.password
					}).then(res => {
						console.log(res)
						if (res.code == 200) {
							uni.setStorage({
								key:'token',
								data: res.token,
								success: () => {
									this.getUserInfo()
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}
			},
			getUserInfo() {
				this.$get(api.GET_USER_INFO).then(res =>{
					console.log(res.user)
					uni.setStorage({
						key: 'userInfo',
						data: JSON.stringify(res.user),
						success: () => {
							uni.switchTab({
								url:"/pages/index/index"
							})
						}
					})
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		},
		onBackPress(e) {
			return true;
		}
	}
</script>

<style lang="scss">
	.login {
	}
	.content {
		margin-bottom: 20rpx;
		background-color: white;
		.logo {
			width: 40%;
			margin: 140rpx auto;
			image {
				width: 100%;
			}
		}
		.box {
			display: flex;
			align-items: center;
			border-bottom: 1px solid black;
		}
		.icon {
			border-radius:50%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 44px;
			height: 44px;
			margin: 20rpx 30rpx;
			// background-color: #eee;
			border: 1px solid skyblue;
		}
		.icon image {
			
			width: 46rpx;
		}
		.text {
			input {
				padding: 30rpx;
			}
		}
}

	.loginRegister {
		// text-align: center;
		font-size: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: grey;
		// padding-top: 20rpx;
		margin: 20px 0;
	}
</style>
