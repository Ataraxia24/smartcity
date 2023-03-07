<template>
	<view>
		<!-- 外层循环服务,这里的newService存储的key是type名和data数据, 可以直接调用 -->
		<view class="service-box" v-for="(item, index) in newService" :key="item.id">
			<text style="font-size: 40rpx;color: #8f8f94;font-weight: bold;">{{index}}</text>
			<!-- 分割线 -->
			<view class="line"></view>
			
			<view class="service-rows">
				<view class="service-block" v-for="(item, index) in item" :key="item.id" @click="onclick(item.id)">
						<image :src="BaseIp + item.imgUrl" mode="widthFix"></image>
						<text>{{item.serviceName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				BaseIp: api.SERVER_BASE,
				newService: {}
			};
		},
		onShow() {
			this.$get(api.NEWS_SERVICE_MESSAGE).then(res => {
				//对所有同一类型的进行分组
				const byType = {}
				res.rows.forEach((x) => {
					if (!Array.isArray(byType[x.serviceType])) {
						byType[x.serviceType] = []
					}
						byType[x.serviceType].push(x)
				});
				this.newService = byType
			})
		},
		methods: {
			onclick(id) {
				if (id == 21) {
					uni.navigateTo({
						url:"/pages/findjob/findjob"
					})
				}
				
				if (id == 29) {
					uni.navigateTo({
						url: '/pages/government/index'
					})
				}
				if (id === 17) {
					uni.navigateTo({
						url: '/pages/park/park'
					})
				}
				if (id === 27) {
					uni.switchTab({
						url: '/pages/dataAnalysis/dataAnalysis'
					})
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.line {
		display: flex;
		align-items: center;
	}
	.line::before,.line::after {
		content:'';
		flex:1;
		height:1px;
		background: #ccc;
	}
	
	.service-box {
		display: flex;
		flex-direction: column;
		width:100%;
		.service-rows {
			margin: 10rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			text-align: center;
			width:100%;
			.service-block {
				margin: 10rpx;
				width:150rpx;
				height:200rpx;
				image {
					width:80%;
					height:100%;
				}
				
				text {
					display: flex;
					justify-content: center;
					white-space: nowrap;
					overflow: hidden;
					font-size: 30rpx;
					color: #8f8f94;
				}
			}
		}
	}
</style>
