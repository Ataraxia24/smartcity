
// var token = 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjA0ZDQyOTViLTY0YTAtNDQ2Zi1iNzcyLWMyNzE3YTA4NDU5OCJ9.IKyTmlaI40qVQjDhKIPSoIT8BvG8ZFnCpsTJ345ewbZeWb8xhJaXQsdKQsOtLWgREllSCjrqJlOMH4Bj9vQcsg';
export default {
	
	get(url, data) {
		let token = uni.getStorageSync('token')
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: data,
				method:"GET",
				header: {
					'Authorization': token
				},
				success: (res) => {
					if (res.data.code == 401) {
						uni.removeStorage('token')
						uni.showModal({
							title: '提示',
							content: '登录验证已过期, 请重新登录',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
							}
						})
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title: '接口请求失败!',
						icon:"none"
					})
					reject(err)
				}
			})
		})
	},
	
	post(url,data) {
		return new Promise((resolve, reject) => {
			let token = uni.getStorageSync('token')
			uni.request({
				url: url,
				data: data,
				method:"POST",
				header: {
					'Authorization': token
				},
				success: (res) => {
					if (res.data.code == 401) {
						uni.showModal({
							title:'提示',
							content:'登录验证已过期, 请重新登录',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
							}
						})
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title:'接口请求失败!',
						icon:"none"
					})
					reject(err)
				},
			})
		})
	},
	put(url,data) {
		return new Promise((resolve, reject) => {
			let token = uni.getStorageSync('token')
			uni.request({
				url: url,
				data: data,
				method:"PUT",
				header: {
					'Authorization': token
				},
				success: (res) => {
					if (res.data.code == 401) {
						uni.showModal({
							title:'提示',
							content:'登录验证已过期, 请重新登录',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url:'/pages/login/login'
									})
								}
							}
						})
					}
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title:'接口请求失败!',
						icon:"none"
					})
					reject(err)
				},
			})
		})
	},
}