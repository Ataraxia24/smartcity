<template>
	<view>
		<uni-list>
			<uni-list-item title="确认密码">
				<template slot="footer">
					<input type="password" placeholder="请输入新密码" v-model="modifyPwd" />
				</template>
			</uni-list-item>
			<uni-list-item title="原始密码">
				<template slot="footer">
					<input type="password" placeholder="请输入原密码" v-model="confirmPwd" />
				</template>
			</uni-list-item>
		</uni-list>
		<button type="primary" style="margin-top: 200rpx;" @click="onclick()">修改</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				modifyPwd: '',
				confirmPwd: '',
			}
		},
		methods: {
			onclick() {
				this.$put(api.RESET_PWD, {
						newPassword: this.modifyPwd,
						oldPassword: this.confirmPwd
					}).then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					})
			}
		}
	}
</script>

<style>

</style>
