<template>
	<view class="container">
		<view class="chooseTime">
			<text style="font-size: 30rpx;color:#8f8f94">请选择入场时间</text>
			<uni-datetime-picker v-model="enterTime" />
			
			<text style="font-size: 30rpx;color:#8f8f94">请选择出场时间</text>
			<uni-datetime-picker v-model="outTime" />
			
		</view>
		
		<view class="icon" @click="chooseTime()">
			<image src="../../static/icons/search.png" mode="aspectFit"></image>
		</view>
		
		<h4 style="color: #8f8f94;">停车历史</h4>
		<view class="line"></view>
		
		<view class="uni-list">
			<uni-list>
				<uni-list-item v-for="(item, index) in historyRecords" :title="item.parkName" :note="item.plateNumber">
					<template slot="footer">
						<text style="font-size: 30rpx;color:#8f8f94">金额:{{item.monetary}}<br>{{item.entryTime}}<br>{{item.outTime}}</text>
			
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		
		<view class="more" style="font-size: 30rpx;color:#8f8f94" v-if="display === 1" @click="onclick()">显示更多~</view>
	</view>
</template>

<script>
	import api from '../../common/apiUtils.js'
export default {
    data() {
        return {
			enterTime: '',
			outTime: '',
			historyRecords: [],
			display: 0,
        }
    },
	onLoad() {
		this.getParkDetailList()
	},
	onReachBottom() {
		this.display = 1
	},
    methods: {
        changeOutTime: function(e) {
            this.outTime = e.detail.value
			console.log(e)
        },
		changeEnterTime(e) {
			this.enterTime = e.detail.value
		},
		getParkDetailList() {
			console.log(this.enterTime, this.outTime)
			this.$get(api.GET_PARK_RECORD_LIST+'?entryTime='+this.enterTime+'&outTime='+this.outTime).then(res => {
				this.historyRecords = [...this.historyRecords, ...res.rows.slice(0,6)]
			})
		},
		onclick() {
			this.getParkDetailList()
		},
		chooseTime() {
			//记得清除之前所存储的数据!
			this.historyRecords = []
			this.getParkDetailList()
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
	.chooseTime {
		margin: 15rpx 10rpx;
		.enterTime {
		margin: 15rpx 10rpx;
			background: #e0e0dd;
			text {
				margin: 0 15rpx;
			}
		}
	}
	
	.uni-list {
		margin: 20rpx 0;
	}
	
	.icon {
		margin: 10rpx 0;
		display: flex;
		justify-content: center;
		
		image {
			background: #007AFF;	
			width: 60rpx;
			height:60rpx;
		}
	}
	.more {
		display: flex;
		justify-content: center;
	}
	
</style>
