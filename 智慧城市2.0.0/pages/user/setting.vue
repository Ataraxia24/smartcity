<template>
	<view>
		<uni-list>
			<uni-list-item title="头像">
				<template slot="footer">
					<view class="image" @click="changeImage()">
						<image :src="avatar"></image>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="昵称">
				<template slot="footer">
					<input type="text" v-model="username" placeholder="请输入名称">
				</template>
			</uni-list-item>
			<uni-list-item title="性别">
				<template slot="footer">
					<uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
				</template>
			</uni-list-item>
			<uni-list-item title="联系电话">
				<template slot="footer">
					<input type="text" v-model="phone" maxlength="11" placeholder="请输入电话">
				</template>
			</uni-list-item>
		</uni-list>
		<button type="primary" style="margin-top: 200rpx;" @click="modify()">修改</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				baseurl: api.SERVER_BASE,
				avatar:'/static/image/person.jpg',
				username: '',
				phone:'',
				range:[{"value":0,"text":"男"},{"value":1,"text":"女"}],
				gender: '',
				value: 0,
				tempFilePath: ''
			}
		},
		onLoad() {
			this.getUserInfo()
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
		methods: {
			getUserInfo() {
				//修改个人信息时展现原值
				this.$get(api.GET_USER_INFO).then(res => {
					console.log(res)
					this.username = res.user.nickName,
					this.phone = res.user.phonenumber
				})
			},
			changeImage() {
				//选择图片
				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success: (res) => {
						this.tempFilePath = res.tempFilePaths[0]
						console.log(this.tempFilePath)
						this.upload()
					}
				})
			},
			upload() {
				let token = uni.getStorageSync('token')
				
				uni.uploadFile({
					url: api.UPLOAD_FILE,
					filePath: this.tempFilePath,
					name: 'file',
					header: {
						'Authorization': token
					},
					success: (res) => {
						console.log(res)
						if (res.statusCode == 200) {
							
							//存入到storage中, 依靠前端显示图片
							uni.setStorageSync('avatar', JSON.parse(res.data).fileName)
							uni.showToast({
								title: '上传成功',
								success: (res) => {
									this.avatar = this.baseurl + '/prod-api' + uni.getStorageSync('avatar')
									console.log(this.avatar)
								}
							})
						}
					},
					fail: (res) => {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			modify() {
				
				this.$put(api.MODIFY_USER_INFO, {
					nickName: this.username,
					phonenumber: this.phone,
					sex: this.gender
				}).then(res => {
					console.log(res.code)
					if (res.code == 200) {
						console.log('success')
						uni.showToast({
							title:'修改成功',
							icon:'success',
							success: () => {
								uni.switchTab({
									url:'/pages/user/user'
								})
							}
						});
					} else {
						uni.showToast({
							title:'修改失败，请稍后再试',
							icon:'none'
						})
					}
				});
			},
			change(e) {
				this.gender = e.detail.value
				console.log(this.gender)
				
			}
		}
	}
</script>

<style lang="scss">
	.image {
		width: 100rpx;
		height: 100rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
