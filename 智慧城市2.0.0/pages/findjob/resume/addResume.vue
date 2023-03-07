<template>
	<view>
		<view>
			<view class="text">工作经验:</view>
			<input type="text" placeholder="工作经验" v-model="job_experience" />
		</view>
		
		<view>
			<view class="text">最高学历:</view>
			<input type="text" placeholder="最高学历" v-model="most_edu" />
		</view>
		
		<view>
			<view class="text">现居住地:</view>
			<input type="text" placeholder="地址" v-model="address" />
		</view>
		
		<view>
			<view class="text">期望职位:</view>
			<picker @change="changeJob" :range="range" :value="index">
				<view>{{range[index]}}</view>
			</picker>
		</view>
		
		<view>
			<view class="text">期望薪资:</view>
			<input type="text" placeholder="期望薪资" v-model="salary" />
		</view>
		
		<view>
			<view class="text">教育经历:</view>
			<input type="text" placeholder="教育经历" v-model="edu_experience" />
		</view>
		
		<view>
			<view class="text">个人简介:</view>
			<textarea placeholder="个人简介" v-model="introduce"></textarea>
		</view>
		<button type="primary" @click="onclick()">新增简历</button>
	</view>
</template>

<script>
	import api from '../../../common/apiUtils.js'
	export default {
		data() {
			return {
				//picker范围, 默认值
				range: ['java开发工程师'],
				job_profession_list: {},
				index: 0,
				job_id: 1,
				job_experience:'',
				most_edu:'',
				address:'',
				salary:'',
				edu_experience:'',
				introduce:'',
			}
		},
		onLoad() {
			this.$get(api.JOB_PROFESSION_LIST).then(res => {
				this.job_profession_list = res.rows
				console.log(this.job_profession_list)
				for (let i in res.rows) {
					this.range[i] = this.job_profession_list[i].professionName
				}
			})
		},
		methods: {
			changeJob(e) {
				//range是数组范围, index是选择下标, 需要通过更改index展现数组内容
				console.log(e)
				this.index = e.detail.value
				//通过下标获取职位id
				this.job_id = this.job_profession_list[this.index].id
				console.log(this.job_id)
			},
			onclick() {
				this.$post(api.ADD_JOB_RESUME, {
					address: this.address,
					education: this.edu_experience,
					experience: this.job_experience,
					individualResume: this.introduce,
					money: this.salary,
					mostEducation: this.most_edu,
					positionId: this.job_id
				}).then(res => {
					uni.showToast({
						title:res.msg,
						icon: 'none'
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
</style>
