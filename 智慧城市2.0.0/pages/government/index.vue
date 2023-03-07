<template>
	<view>
		<!-- 广告轮播图 -->
		<swiper indicator-dots="true" autoplay="true" duration="500" interval="3000">
			<swiper-item v-for="(item, index) in banner_img_list" :key="item.id">
				<image :src="baseurl + item.imgUrl" style="width: 100%"></image>
			</swiper-item>
		</swiper>
		<!-- 市民祈求分类 -->
		<view class="container">
			<h4 style="color: #8f8f94;">祈求分类</h4>
			<view class="line"></view>
			
			<swiper style="height:500rpx;">
				<swiper-item>
					<view class="item">
						<!-- 第一行 -->
						<view class="firstCategory">
							<view v-for="(item, index) in FirstWishList" class="firstBlock" :key="item.id" @click="onclick(item.id)">
								<image :src="baseurl + item.imgUrl" mode="aspectFit"></image>
								<view class="text">
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
						
						<!-- 第二行 -->
						<view class="firstCategory">
							<view v-for="(item, index) in SecondWishList" class="firstBlock" :key="item.id" @click="onclick(item.id)">
								<image :src="baseurl + item.imgUrl" mode="aspectFit"></image>
								<view class="text">
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
				
				<swiper-item>
					<view class="item">
						<!-- 第一行 -->
						<view class="firstCategory">
							<view v-for="(item, index) in OtherFirstWishList" class="firstBlock" :key="item.id" @click="onclick(item.id)">
								<image :src="baseurl + item.imgUrl" mode="aspectFit"></image>
								<view class="text">
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
						
						<!-- 第二行 -->
						<view class="firstCategory">
							<view v-for="(item, index) in OtherSecondWishList" class="firstBlock" :key="item.id" @click="onclick(item.id)">
								<image :src="baseurl + item.imgUrl" mode="aspectFit"></image>
								<view class="text">
									<text>{{item.name}}</text>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 我的祈求 -->
		<h4 style="color: #8f8f94;">我的祈求</h4>
		<view class="line"></view>
		<view>
			<uni-list>
				<uni-list-chat v-for="(item, index) in pageList" :title="item.title"
					:avatarCircle="true" :avatar="baseurl + item.imgUrl" :note="item.content" :key="item.id" 
					:clickable="true" @click="onclickList(item.appealCategoryId, item.id)"
				>
					<text style="color: #8f8f94; font-size: 25rpx;">{{item.createTime}}</text>
					<text style="color: #8f8f94; font-size: 25rpx;" v-if="item.state === '1'">已处理</text>
					<text style="color: #8f8f94; font-size: 25rpx;" v-if="item.state === '0'">未处理</text>
				</uni-list-chat>
			</uni-list>
			
			<uni-pagination :total="total" @change="onchange"></uni-pagination>
		</view>
		
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		computed:{
			first(){
				return this.FirstWishList.filter((item,index) => index < 8)
			},
			second(){
				return this.FirstWishList.filter((item,index) => index < 16&&index>7 )
			}
		},
		data() {
			return {
				//广告轮播
				banner_img_list: [],
				baseurl: api.SERVER_BASE,
				FirstWishList: [],
				SecondWishList: [],
				OtherFirstWishList: [],
				OtherSecondWishList: [],
				//当前页码
				currentPageSize: 1,
				baseurl: api.SERVER_BASE,
				total: 0,
				id: '',
				pageList: []
			}
		},
		onLoad() {
			uni.removeStorageSync('categoryId')
			this.getBannerImage()
			this.getWishCategory()
			
			this.getAppealList()
		},
		methods: {
			getBannerImage() {
				this.$get(api.ALL_AD_IMAGE).then(res => {
					this.banner_img_list = res.data
				})
			},
			getWishCategory() {
				this.$get(api.ALL_WISH_CATEGORY).then(res => {
					this.FirstWishList = res.rows.slice(0,4)
					this.SecondWishList = res.rows.slice(4,8)
					this.OtherFirstWishList = res.rows.slice(8,12)
					this.OtherSecondWishList = res.rows.slice(12,16)
				})
			},
			onclick(id) {
				//存储分类id
				uni.setStorage({
					key: 'categoryId',
					data: id,
					success: (res) => {
						uni.navigateTo({
							url: '/pages/government/wishpage?appealCategoryId=' + id
						})
					}
				})
			},
			getAppealList() {
				this.$get(
				api.GET_APPEAL_MY_LIST + '?pageNum=' 
				+ this.currentPageSize + '&pageSize=10').then(res => {
					console.log(res)
					this.pageList = res.rows
					this.total = res.total
				})
			},
			onchange(e) {
				this.currentPageSize = e.current
				this.getAppealList()
			},
			onclickList(categoryId, id) {
				//存储分类id
				uni.setStorage({
					key: 'categoryId',
					data: categoryId,
					success: (res) => {
						uni.navigateTo({
							url: '/pages/government/wishpageList?id=' + id
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
	}
	
	.line::before, .line::after {
		flex: 1;
		content: '';
		align-items: center;
		background: black;
		height: 1px;
	}
	
	.container {
		padding: 10rpx 0;
		width: 100%;
		height: 400rpx;
	}
	
	.item {
		margin: 15rpx 0;
		display: flex;
		flex-direction: column;
		
		.firstCategory {
			display: flex;
			.firstBlock {
				width: 100%;
				height:150rpx;
				image {
					width: 100%;
					height: 50%;
				}
				
				.text {
					color: #8f8f94;
					font-size: 25rpx;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
</style>
