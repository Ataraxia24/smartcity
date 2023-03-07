<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			if (!uni.getStorageSync('token')) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
</style>
