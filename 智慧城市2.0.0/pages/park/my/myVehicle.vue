<template>
	<view>
		<h4 style="color: #8f8f94;">添加车辆</h4>
		<view class="line"></view>
		
		<view class="button">
			<uni-list-item title="车牌号">
				<template slot="footer">
					<input type="text" v-model="car_number" placeholder="请输入车牌号码">
				</template>
			</uni-list-item>
			<uni-list-item title="车型">
				<template slot="footer">
					<input type="text" v-model="car_type" placeholder="请输入车型号">
				</template>
			</uni-list-item>
			<button type="primary" @click="addcar()">添加我的车辆</button>
			
		</view>
		
		<h4 style="color: #8f8f94;">我的车辆</h4>
		<view class="line"></view>
		
		<view v-if="my_car_list.length == 0" style="text-align: center;font-size: 30rpx;color:#8f8f94;">
			<text>暂无车辆~</text>
		</view>
		
		<view v-for="(item, index) in my_car_list" style="margin: 30rpx 20rpx">
			<view>我的车牌:<text style="font-size: 40rpx;color:#8f8f94;margin-left:20rpx">{{item.plateNo}}</text></view>
			<view>我的车型:<text style="font-size: 40rpx;color:#8f8f94;margin-left:20rpx">{{item.type}}</text></view>
			
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	import api from '../../../common/apiUtils.js'
	export default {
		data() {
			return {
				car_number: '',
				car_type: '',
				my_car_list: []
			}
		},
		onLoad() {
			this.$get(api.GET_PARK_MY_CAR).then(res => {
				this.my_car_list = res.rows
			})
		},
		methods: {
			addcar() {
				if (!this.car_number || !this.car_type) {
					uni.showToast({
						title: '数据不能为空!',
						icon: 'none'
					})
					return
				}
				this.$post(api.ADD_PARK_MY_CAR, {
					plateNo: this.car_number,
					type: this.car_type
				}).then(res => {
					uni.showToast({
						title: res.msg
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.line {
		display: flex;
	}
	.line::before, .line::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #e0e0dd;
		align-items: center;
	}
	.button {
		margin: 30rpx 0;
	}
</style>
