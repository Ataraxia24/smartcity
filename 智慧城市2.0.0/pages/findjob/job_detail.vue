<template>
	<view>
		<!-- 第一部分 -->
		<view class="job">
			<h2>岗位详情</h2>
			
			<view>
				<text>职位名称:{{job_detail_list.professionName}}</text>
			</view>
			<view>
				<text>岗位职责:{{job_detail_list.obligation}}</text>
			</view>
			<view>
				<text>公司地点:{{job_detail_list.address}}</text>
			</view>
			<view>
				<text>薪资待遇:{{job_detail_list.salary}}</text>
			</view>
			<view>
				<text>联系人:{{job_detail_list.contacts}}</text>
			</view>
			<view>
				<text>职位需求:{{job_detail_list.need}}</text>
			</view>
		</view>
		
		<view class="line"></view>
		
		<!-- 第二部分 -->
		<h2>公司详情</h2>
		
		<view class="company">
			<view>
				<text>公司名称:{{company_detail_list.companyName}}</text>
			</view>
			
			<view>
				<text>公司简介:{{company_detail_list.introductory}}</text>
			</view>
		</view>
		
		<button type="primary" style="margin: 30rpx;" @click="onclick()">投简历</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				job_detail_list: [],
				company_detail_list: [],
				resume_detail_list: [],			//存储请求后的对象, 需要投递时传递值
			}
		},
		onLoad(e) {
			//userId:1116261
			
			console.log(e.id)
			this.$get(api.JOB_POST_DETAIL_LIST+e.id).then(res => {
				this.job_detail_list = res.data
			})
			
			this.$get(api.COMPANY_DETAIL_LIST+e.id).then(res => {
				this.company_detail_list = res.data
			})
		},
		methods: {
			onclick() {
				
				//查询用户是否完善简历：工作经历、教育经历信息，则跳转至个人简历页面
				//这里无法获取登录后的信息，直接使用本userId
				
				this.$get(api.FIND_JOB_RESUME+'1116261').then(res => {
					console.log(res)
					this.resume_detail_list = res.data
					
					if (res.data.education && res.data.experience) {
						this.$post(api.JOB_DELIVER, {
							companyId: this.job_detail_list.companyId,
							money: this.resume_detail_list.money,
							postId: this.job_detail_list.positionId,
							postName: this.job_detail_list.postName
						}).then(res => {
							uni.showToast({
								title: '投递成功'
							})
						})
						
					} else {
						uni.showModal({
							title: '提示',
							content: '请完善简历!',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: 'resume/resumeDetail'
									})
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.line {
		display: flex;
		align-items: center;
	}
	.line::before, .line::after {
		content: '';
		flex: 1;
		height: 1px;
		background: black;
	}
	view {
			margin: 10rpx 10rpx;
		}
</style>
