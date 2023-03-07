<template>
	<view class="container">
		<!--轮播图模块-->
		<view class="uni-margin-wrap">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500">
				<swiper-item v-for="(item,index) in imageList" :key="item.id">
					<view>
						<image :src="BaseIp+item.advImg" style="width:100%"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 应用服务模块 -->
		<view class="service">
			<h5>应用服务</h5>
			<view class="line"></view>
			
			<view class="service-box">
				<!-- 第一行 -->
				<view class="rowsBlock">
						
					<view class="service-block" v-for="(item,index) in FirstNewsList" :key="item.id">
						<navigator @click="enterUrl(item.id)">
							<image :src="BaseIp + item.imgUrl" mode="aspectFit"></image>
							<view class="text">
								<text>{{item.serviceName}}</text>
							</view>
						</navigator>
					</view>
				</view>
				
				<!-- 第二行 -->
				<view class="rowsBlock">
					
					<view class="service-block" v-for="(item,index) in SecondNewsList" :key="item.id">
						<navigator @click="enterUrl(item.id)">
							<image :src="BaseIp + item.imgUrl" mode="aspectFit"></image>
							<view class="text">
								<text>{{item.serviceName}}</text>
							</view>
						</navigator>
					</view>
					<view class="service-block">
						<navigator url="../moreService/moreService" open-type="switchTab">
							<image src="../../static/icons/services/Outpatient.png" mode="aspectFit"></image>
							<view class="text">
								<text>更多服务</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<!-- 新闻专栏模块 -->
		<h5>专栏</h5>
		<view class="line"></view>
		
		<view class="category">
			<scroll-view class="scroll-view-H" scroll-x="true" scroll-left="120" show-scrollbar="true">
				<view class="scroll-view-item" v-for="(item,index) in newsTopic" @click="onclick(item.id,index)"
				:key="item.id" :class="index == navIndex ? 'clickNav' : ''"
				>{{item.name}}</view>
			</scroll-view>
		</view>
		
		<view class="newsContent">
			<view class="line"></view>
			<view class="newsBlock" v-for="(item,index) in newsList" :key="item.id">
				<view class="newsImg" >
					<image :src="BaseIp + item.cover"></image>
				</view>
				<view class="newsMessage">
					<view class="newsMessageTitle">
						<text>{{item.title}}</text>
					</view>
					<view class="newsMessageContent">
						<rich-text :nodes="item.content"></rich-text>
						<view class="detail-message">
							<text>评论:{{item.commentNum}}</text>
							<text>点赞:{{item.likeNum}}</text>
							<text>发布:{{item.publishDate}}</text>
							<text>阅读:{{item.readNum}}</text>
						</view>
					</view>
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
				imageList:[],
				FirstNewsList:[],
				SecondNewsList:[],
				newsTopic:[],
				newsList:[],
				navIndex:'0'
			}
		},
		onLoad() {
			this.verifyToken()
		},
		methods: {
			verifyToken() {
				uni.getStorage({
					key: 'token',
					success: (res) => {
						this.getRotation()
						this.getSomeService()
						this.getNewsName()
						this.displayNews()
					},
					fail: (res) => {
						uni.redirectTo({
							url: '/pages/login/login'
						})
					}
				})
			},
			getRotation() {
				this.$get(api.NEWS_PRIMARY_IMAGE).then(res=>{
					this.imageList = res.rows
				})
			},
			getSomeService() {
				this.$get(api.NEWS_SERVICE_MESSAGE).then(res => {
					//手动添加所需模块  29 政府; 25 爱心; 26 驿站; 27数据分析
					this.FirstNewsList = res.rows.slice(0,4)
					this.SecondNewsList = res.rows.slice(15,18)
				})
			},
			getNewsName() {
				this.$get(api.NEWS_CATEGORY_LIST).then(res => {
					this.newsTopic = res.data
				})
			},
			onclick(id,index) {
				console.log(id,index)
				this.navIndex = index
				this.displayNews(id)
			},
			displayNews(id=9) {	//新闻id
				console.log(id)
				this.$get(api.NEWS_PRESS_LIST, {
					type: id
				}).then(res => {
					this.newsList = res.rows
				})
			},
			enterUrl(id) {
				console.log(id)
				if (id === 27) {
					uni.switchTab({
						url: '/pages/dataAnalysis/dataAnalysis'
					})
				} else if (id === 29) {
					uni.navigateTo({
						url: '/pages/government/index'
					})
				} else if (id === 17) {
					uni.navigateTo({
						url: '/pages/park/park'
					})
				}
			}
			
		}
	}
</script>

<style lang="scss">
	.container { 
		
		text {
			font-size: 30rpx;
			color:#8f8f94;
		}
		h5 {
			margin-top: 5px;
			color:#8f8f94;
		}
		//分隔水平线
		.line {
			margin: 5px 0;
			display: flex;
			align-items: center;
		}
		.line::before,.line::after {
			content:'';
			flex:1;
			height:1px;
			background: #8f8f94;
		}
		.service {
				width: 100%;
				height: 100%;
			
			.service-box {
				
				margin-top: 20rpx;
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: column;		//让子元素横向排列
				.rowsBlock {
					display: flex;
					// flex-direction: row;		//让八个子元素纵向排列
					// justify-content: center;	//让子元素在x轴方向居中
					// align-content: center;		//y轴
					margin-top: 10rpx;
				}
				.service-block {
						display: flex;
						flex-direction: column; 
						width:100%;
					navigator {
						width:auto;
						height:150rpx;
					}
						image {
							width: 100%;
							height: 50%;
						}
					}
				.text {
					display: flex;
					justify-content: center;
					text {
						font-size: 30rpx;
						white-space: nowrap;		//不换行
						overflow: hidden;
					}
				}
			}
		}
		
		.category {
			flex:1;
			.scroll-view-H {
				white-space: nowrap;
				background: #8f8f94;
				height: 25px;
				.scroll-view-item {
					display: inline-block;
					color:white;
					margin: 0 5px;
					&.clickNav {
						color:black;
					}
				}
			}
		}
		
		//新闻内容
		.newsContent {
			display: flex;
			flex-direction: column;
			.newsBlock {
				margin: 10rpx 10rpx;
				display: flex;
				.newsImg {
					width:200rpx;
					image {
						width:100%;
						height:100%;
					}
				}
				.newsMessage{
					display: flex;
					flex-direction: column;
					flex:1;
					.detail-message {
						flex:1;
						text {
							color:#8f8f94;
							font-size:25rpx;
							margin: 0 10rpx;
						}
					}
					.newsMessageTitle{
						text {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							color:black;
							font-weight: bold;
						}
					}
					.newsMessageContent {
						rich-text {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				}
				
			}
		}
	}
	
</style>
