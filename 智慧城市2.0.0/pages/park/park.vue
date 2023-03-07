<template>
	<view>
		<view class="box-bg">
			<uni-nav-bar>
				<block slot="right">
					<view class="city">
						<image src="../../static/icons/services/bus.png" mode="aspectFit" style="width: 80rpx;height: 80rpx;" @click="park_record()"></image>
					</view>
				</block>
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索停车场名称" v-model="parkName"/>
				</view>
				<block slot="left">
					<text style="width: 70rpx;height: 50rpx; background: #007AFF; color: white; text-align: center; line-height: 50rpx;" @click="mymessage()">我的</text>
					<view class="city" @click="getParkList()">
						搜索
					</view>
				</block>
			</uni-nav-bar>
		</view>
		
		<!-- 轮播图 -->
		<swiper indicator-dots="true" autoplay="true" duration="500" interval="3000">
			<swiper-item v-for="(item, index) in banner_img_list" :key="item.id">
				<image :src="baseurl + item.advImg" style="width: 100%"></image>
			</swiper-item>
		</swiper>
		
		<!-- 展示列表 -->
		<h4 style="color: #8f8f94;">停车场</h4>
		<view class="line"></view>
		<view>
			<uni-list>
				<uni-list-chat v-for="(item, index) in pageList" :title="item.parkName"
					:avatarCircle="true" :avatar="baseurl + item.imgUrl" :note="item.address" :key="item.id" 
					:clickable="true" @click="onclickList(item.id)"
			>	
					<text style="color: #8f8f94; font-size: 25rpx;">
						<image src="../../static/icons/postion.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
						
					{{item.distance}}m</text>
					
					<text style="color: #8f8f94; font-size: 25rpx;">空位:{{item.vacancy}}/{{item.allPark}}</text>
					<text style="color: #8f8f94; font-size: 25rpx;">价格:{{item.rates}}</text>
				</uni-list-chat>
			</uni-list>
			
		</view>
		
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		components: {},
		data() {
			return {
				baseurl: api.SERVER_BASE,
				banner_img_list: [],
				pageList: [],
				parkName: ''
			}
		},
		onLoad() {
			this.getBannerImage()
			this.getParkList()
		},
		methods: {
			getBannerImage() {
				this.$get(api.PARK_ROTATION_IMAGE).then(res => {
					this.banner_img_list = res.rows
				})
			},
			getParkList() {
				this.$get(api.GET_PARK_LIST, {
					parkName: this.parkName
				}).then(res => {
					console.log(res)
					this.pageList = res.rows
				})
			},
			onclickList(id) {
				uni.navigateTo({
					url: '/pages/park/park_detail?id=' + id 
				})
			},
			park_record() {
				uni.navigateTo({
					url: '/pages/park/park_record'
				})
			},
			mymessage() {
				uni.navigateTo({
					url: '/pages/park/my/my'
				})
			}
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh')
			setTimeout(function() {
				uni.stopPullDownRefresh()
				console.log('stopPullDownRefresh')
			}, 1000)
		}
	}
</script>


<style lang="scss">
	$nav-height: 30px;

	.box-bg {
		background-color: #F5F5F5;
		padding: 5px 0;
	}

	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		// width: 160rpx;
		margin-left: 4px;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		// width: 500rpx;
		flex: 1;
		background-color: #f8f8f8;
		height: $nav-height;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: $nav-height;
	}

	.input-uni-icon {
		line-height: $nav-height;
	}

	.nav-bar-input {
		height: $nav-height;
		line-height: $nav-height;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}
</style>


