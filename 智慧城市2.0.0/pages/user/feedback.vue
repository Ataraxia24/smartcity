<template>
	<view>
		<view class="container">
			<textarea placeholder="请输入意见" maxlength="150" @input="oninput" v-model="content" />
			<text>{{textNum}}/150</text>
		</view>
		
		<button type="primary" @click="submit()">提交</button>
	</view>
</template>

<script>
	import api from "../../common/apiUtils.js"
	export default {
		data() {
			return {
				textNum: 0,
				content:''
			}
		},
		methods: {
			oninput(e) {
				this.textNum = e.detail.cursor
			},
			submit() {
				if (this.content.length == 0) {
					uni.showToast({
						title:"请输入建议!",
						icon:"none"
					})
				} else {
					this.$post(api.USER_FEEDBACK, {
						content: this.content
					}).then(res => {
						uni.showToast({
							title:"提交成功",
							success:(res)=> {
								this.content = ''
							}
						})
					})
				}
				
			}
		}
	}
</script>

<style>
	.container {
		width:100%;
		height:800rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	textarea{
		width:100%;
		height: 80%;
		border:1px solid #8f8f94;
	}
	text{
		color:#8f8f94;
	}
</style>
