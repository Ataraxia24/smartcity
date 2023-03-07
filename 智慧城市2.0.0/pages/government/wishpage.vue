<template>
	<view>
		<uni-list>
			<uni-list-chat v-for="(item, index) in pageList" :title="item.title"
				:avatarCircle="true" :avatar="baseurl + item.imgUrl" :note="item.content" :key="item.id" 
				:clickable="true" @click="onclick(item.id)"
			>
				<text style="color: #8f8f94; font-size: 25rpx;">{{item.createTime}}</text>
				<text style="color: #8f8f94; font-size: 25rpx;" v-if="item.state === '1'">已处理</text>
				<text style="color: #8f8f94; font-size: 25rpx;" v-if="item.state === '0'">未处理</text>
			</uni-list-chat>
		</uni-list>
		
		<uni-pagination :total="total" @change="onchange"></uni-pagination>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
	export default {
		data() {
			return {
				//当前页码
				currentPageSize: 1,
				baseurl: api.SERVER_BASE,
				total: 0,
				id: '',
				pageList: []
			}
		},
		onLoad(e) {
			this.id = e.appealCategoryId
			this.getAppealList()
		},
		methods: {
			getAppealList() {
				this.$get(
				api.GET_APPEAL_LIST + '?appealCategoryId=' 
				+ this.id + '&pageNum=' 
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
			onclick(id) {
				uni.navigateTo({
					url: '/pages/government/wishpageList?id=' + id
				})
			}
		}
	}
</script>

<style>

</style>
