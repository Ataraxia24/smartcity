<template>
	<view>
		<!-- 图片 -->
		<view>
			<image :src="baseurl + park_detail_list.imgUrl" style="width: 200rpx; height: 200rpx;"></image>
		</view>
		<!-- 停车场名称 -->
			<view>
				<text>停车场名称:</text>
				<text style="color:#8f8f94;">{{park_detail_list.parkName}}</text>
			</view>
			<!-- 距离 -->
			<view>
				<text>距离:</text>
				<text style="color: #8f8f94; font-size: 25rpx;">
					<image src="../../static/icons/postion.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
					
				{{park_detail_list.distance}}米</text>
			</view>
			
			<!-- 地址 -->
			<view>
				<text>地址:</text>
				<text style="color:#8f8f94;">{{park_detail_list.address}}</text>
			</view>
			<!-- 是否对外开放 -->
			<view>
				<text>开放:</text>
				<text style="color: #8f8f94;" v-if="park_detail_list.open === 'Y'">是</text>
				<text style="color: #8f8f94;" v-if="park_detail_list.open === 'N'">否</text>
			</view>
			<!-- 收费 -->
			<view>
				<text>收费:</text>
				<text style="color:#8f8f94;">{{park_detail_list.rates}}</text>
			</view>
			<!-- 封顶价格 -->
			<view>
				<text>封顶价格:</text>
				<text style="color:#8f8f94;">{{park_detail_list.priceCaps}}</text>
			</view>
			<!-- 空位个数/总停车位 -->
			<view>
				<text>空位/总数:</text>
				<text style="color:#8f8f94;">{{park_detail_list.vacancy}}/{{park_detail_list.allPark}}</text>
			</view>
			
			<button type="primary" @click="onclick()">返回主页</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				baseurl: api.SERVER_BASE,
				park_id: '',
				park_detail_list: [],
				
			}
		},
		onLoad(e) {
			console.log(e.id)
			this.park_id = e.id
			this.getAppealListDetail()
		},
		methods: {
			getAppealListDetail() {
				this.$get(api.GET_PARK_DETAIL + this.park_id).then(res => {
					this.park_detail_list = res.data
				})
			},
			onclick() {
				uni.navigateTo({
					url: '/pages/park/park'
				})
			}
		}
	}
</script>

<style>

</style>
