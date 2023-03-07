<template>
	<view>
		<template slot="header">
				
			<view>
				设置ip端口
			</view>
		</template>
		
			<view class="startup">
		<template>
				<swiper indicator-dots="true" indicator-active-color="#ededed" indicator-color="#afafaf">
					<swiper-item v-for="item in imgList" >
						<image :src="item.imgUrl"></image>
					</swiper-item>
				</swiper>
		</template>
			</view>
			
		<template slot="footer">
				<view class="button">立即体验</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
					imgUrl: '/static/image/guide1.jpg'
				},
				{
					imgUrl: '/static/image/guide2.jpg'
				},
				{
					imgUrl: '/static/image/guide3.jpg'
				},
				{
					imgUrl: '/static/image/guide4.jpg'
				},
				{
					imgUrl: '/static/image/guide5.jpg'
				},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.startup {
		width: 100%;
		position: fixed;
		left: 0;top: 0;bottom: 0;
		swiper {
			width: 100%;
			height: 80%;
		}
		swiper-item {
			width: 100%;
			height: 80%;
		}
		image {
			width: 100%;
			height: 80%;
			
		}
	}
	
	.button {
		
	}
</style>
