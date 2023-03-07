<template>
	<view>
		<!--需要token api-->
		<view class="tabar">
			<text @click="onclick(1)" :class="navIndex == 1 ? 'navColor': ''">找工作</text>
			<text @click="onclick(2)" :class="navIndex == 2 ? 'navColor': ''">投递记录</text>
			<text @click="onclick(3)" :class="navIndex == 3 ? 'navColor': ''">个人简历</text>
		</view>
		
		<!-- 找工作默认页面 -->
		<view class="content" v-if="navIndex == 1">
			<!-- 幻灯片 -->
			<view class="uni-margin-wrap">
				<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500">
					<swiper-item v-for="(item,index) in imageList" :key="item.id">
						<view>
							<image :src="BaseIp+item.advImg" style="width:100%"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<!-- 搜索框列表数据 -->
			<view class="job-list">
				<uni-search-bar @confirm="searchJob" placeholder="搜索" bgColor="#e0e3e3"></uni-search-bar>
			</view>
			
			<view class="job-list-desc">
				<!-- 9宫图展示职位名称 -->
				<uni-grid :column="3">
					<uni-grid-item v-for="(item, index) in professionList" :key="item.id">
						<view class="job-block" @click="change(item.id)">
							<text class="text" style="font-size: 25rpx;">{{item.professionName}}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			
			
			<!-- 职位与招聘信息 -->
			<view class="employeeList">
				<view class="employeeBlock" v-for="(item, index) in employeeList" :key="item.id" @click="gotodetail(item.id)">
					
					<view class="line"></view>
					
					<text>职位名称:{{item.professionName}}</text>
					<text>岗位职责:{{item.obligation}}</text>
					<text>公司地点:{{item.address}}</text>
					<text>薪资待遇:{{item.salary}}</text>
				</view>
			</view>
		</view>
		
		<!-- 投递记录页面 -->
		<view class="deliverRecord">
			
		</view>
		
		<!-- 个人简历 -->
		<view class="myResume" v-if="navIndex == 3">
			<uni-list>
				<!-- 新增简历 -->
				<uni-list-item title="新增简历" showArrow="true" to="resume/addResume"></uni-list-item>
				<!-- 查询简历, 在页面中修改 -->
				<uni-list-item title="查询简历" showArrow="true" to="resume/resumeDetail"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				BaseIp: api.SERVER_BASE,
				imageList: [],
				professionList: [],
				employeeList: [],
				professionName: "",
				requestForProfession: api.JOB_POST_LIST,
				navIndex: 1							//导航栏下标
			}
		},
		onLoad() {
			this.onclick(this.navIndex)
			this.getProfessionList()
			this.getEmployeeMessage()
		},
		methods: {
			getRotation() {
				this.$get(api.NEWS_PRIMARY_IMAGE).then(res=>{
					this.imageList = res.rows
				})
			},
			searchJob(e) {
				this.requestForProfession = api.JOB_POST_LIST
				this.requestForProfession = this.requestForProfession + '?name=' + e.value
				console.log(this.requestForProfession)
				this.getEmployeeMessage()
			},
			onclick(index) {
				console.log(index)
				this.navIndex = index
				if (index == 1) {
					this.getRotation()
				} else if (index == 2){
					//投递记录
					uni.showToast({
						title: '接口有误，无法查看',
						icon:'none'
					})
				} else if (index == 3){
					//个人简历
					
				}
			},
			getProfessionList(){
				this.$get(api.JOB_PROFESSION_LIST).then(res => {
					this.professionList = res.rows.slice(0,9)
				})
			},
			change(id) {
				//每次请求刷新
				this.requestForProfession = api.JOB_POST_LIST
				this.requestForProfession = this.requestForProfession + '?professionId=' + id
				this.getEmployeeMessage()
			},
			getEmployeeMessage() {
				this.$get(this.requestForProfession).then(res => {
					if (res.rows.length == 0) {
						uni.showToast({
							title:'未找到信息',
							icon:'none'
						})
					}
					this.employeeList = res.rows
				})
			},
			gotodetail(id) {
				uni.navigateTo({
					url: '/pages/findjob/job_detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.line {
		margin: 10rpx 0;
		display: flex;
		align-items: center;
	}
	.line::before,.line::after {
		content: '';
		flex: 1;
		height: 1px;
		background: black;
	}
	
	.navColor {
		background: #007AFF;
	}
	.tabar {
		display: flex;
		height: 90rpx;
		width:100%;
		margin: 10rpx 5rpx;
		background: skyblue;
		
		text {
			flex:1;
			text-align: center;
			line-height: 90rpx;
			color:white;
			font-weight: bold;
			font-size: 40rpx;
		}
	}
	.job-block {
		text-align: center;
		width:100%;
		height:100%;
	}
	
	.employeeList {
		.employeeBlock {
			margin: 10rpx 0;
			padding: 0 10rpx;
			display: flex;
			flex-direction: column;
			text {
				color: #8f8f94;
				font-size: 25rpx;
			}
		}
	}
	
</style>
