<template>
	<view class="container">
		<view :class="categoryDefaultId === 23 ? 'categoryFalse' : 'categoryTrue'">
			
			<view class="text">祈求分类:</view>
			<picker :range="range" :value="index" @change="changeCategory">
				<view>{{range[index]}}</view>
			</picker>
		</view>
		<view>
			<view class="text">诉求标题:</view>
			<input type="text" placeholder="请输入标题" v-model="wish_title" />
		</view>
		
		<view>
			<view class="text">诉求内容:</view>
			<input type="text" placeholder="请输入内容" v-model="wish_content" />
		</view>
		
		<view>
			<view class="text">承办单位:</view>
			<input type="text" placeholder="承办商" v-model="wish_undertaker" />
		</view>
		<button type="primary" @click="onclick()" style="margin: 25px 0;">发布诉求</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				//picker范围, 默认值
				range: ['其他诉求'],
				categoryDefaultId: '',
				wish_category_list: [],
				index: 0,
				wish_title: '',
				wish_content: '',
				wish_undertaker: '',
				categoryId: ''
			}
		},
		onLoad() {
			//默认获取id
			this.categoryDefaultId = uni.getStorageSync('categoryId')
			console.log('categoryId',this.categoryDefaultId)
			
			this.$get(api.ALL_WISH_CATEGORY).then(res => {
				this.wish_category_list = res.rows
				console.log(this.wish_category_list)
				
				for (let i in res.rows) {
					this.range[i] = this.wish_category_list[i].name
				}
			})
		},
		methods: {
			changeCategory(e) {
				//range是数组范围, index是选择下标, 需要通过更改index展现数组内容
				console.log(e)
				this.index = e.detail.value
				this.categoryId = this.wish_category_list[this.index].id
				console.log(this.categoryId)
			},
			onclick() {
				if (!this.wish_title || !this.wish_content || !this.wish_undertaker) {
					uni.showToast({
						title: '数据不能为空!',
						icon: 'none'
					})
					return
				}
				
				if (this.categoryId == '') {
					this.categoryId = this.categoryDefaultId 
				}
				
				this.$post(api.CREATE_APPEAL_WISH, {
					appealCategoryId: this.categoryId,
					title: this.wish_title,
					content: this.wish_content,
					undertaker: this.wish_undertaker,
				}).then(res => {
					uni.showModal({
						title: '提示',
						content: res.msg,
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/government/wishpage?appealCategoryId=' + this.categoryId
								})
							}
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.text {
		background: #ececec;
		height:80rpx;
		font-size: 40rpx;
		line-height: 80rpx;
	}
	textarea {
		width: 100%;
		height: 180rpx;
	}
	
	.categoryTrue {
		display: none;
	}
	.categoryFalse {
	}
	
</style>
