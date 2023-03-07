<template>
	<view>
		<!-- 图片 -->
		<view>
			<image :src="baseurl + appealDetail.imgUrl"></image>
		</view>
		<!-- 标题 -->
			<view>
				<text>标题:</text>
				<text style="color:#8f8f94;">{{appealDetail.title}}</text>
			</view>
			<!-- 诉求内容 -->
			<view>
				<text>内容:</text>
				<text style="color:#8f8f94;">{{appealDetail.content}}</text>
			</view>
			<!-- 承办单位 -->
			<view>
				<text>承办商:</text>
				<text style="color:#8f8f94;">{{appealDetail.undertaker}}</text>
			</view>
			<!-- 提交时间 -->
			<view>
				<text>时间:</text>
				<text style="color:#8f8f94;">{{appealDetail.createTime}}</text>
			</view>
			<!-- 处理状态 -->
			<view>
				<text>是否处理:</text>
				<text style="color: #8f8f94;" v-if="appealDetail.state === '1'">已处理</text>
				<text style="color: #8f8f94;" v-if="appealDetail.state === '0'">未处理</text>
			</view>
			<!-- 处理结果 -->
			<view>
				<text>结果:</text>
				<text style="color:#8f8f94;">{{appealDetail.detailResult}}</text>
			</view>
			
		
			<button type="primary" @click="onclick()">发布诉求</button>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				id: 0,
				baseurl: api.SERVER_BASE,
				appealDetail: [],
			}
		},
		onLoad(e) {
			console.log(e.id)
			this.id = e.id
			this.getAppealListDetail()
		},
		methods: {
			getAppealListDetail() {
				this.$get(api.GET_APPEAL_DETAIL + this.id).then(res => {
					this.appealDetail = res.data
				})
			},
			onclick() {
				uni.navigateTo({
					url: '/pages/government/addwish'
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
