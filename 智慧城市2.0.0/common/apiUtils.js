var ip = '124.93.196.45:10001'
var baseUrl = 'http://' + ip

export default {
	//引导页
	SERVER_BASE : baseUrl,
	//登录
	USER_LOGIN: baseUrl + '/prod-api/api/login',
	//注册
	REGISTER_USER: baseUrl + '/prod-api/api/register',
	//新闻轮播
	NEWS_PRIMARY_IMAGE: baseUrl + '/prod-api/api/rotation/list',
	//全部服务
	NEWS_SERVICE_MESSAGE: baseUrl + '/prod-api/api/service/list',
	//获取新闻资讯, 导航栏部分
	NEWS_CATEGORY_LIST: baseUrl + '/prod-api/press/category/list',
	//获取新闻列表
	NEWS_PRESS_LIST: baseUrl + '/prod-api/press/press/list',
	//获取用户信息
	GET_USER_INFO: baseUrl + '/prod-api/api/common/user/getInfo',
	//上传文件
	UPLOAD_FILE: baseUrl + '/prod-api/common/upload',
	//修改用户信息
	MODIFY_USER_INFO: baseUrl + '/prod-api/api/common/user',
	//修改用户密码
	RESET_PWD: baseUrl + '/prod-api/api/common/user/resetPwd',
	//提交反馈
	USER_FEEDBACK: baseUrl + '/prod-api/api/common/feedback',
	//职位信息, 根据职位id找寻招聘信息
	JOB_PROFESSION_LIST: baseUrl + '/prod-api/api/job/profession/list',
	//招聘信息
	JOB_POST_LIST: baseUrl + '/prod-api/api/job/post/list',
	//招聘详细信息
	JOB_POST_DETAIL_LIST: baseUrl + '/prod-api/api/job/post/',
	//获取公司详情
	COMPANY_DETAIL_LIST: baseUrl + '/prod-api/api/job/company/',
	//查询用户简历详情
	GET_USER_RESUME: baseUrl + '/prod-api/api/job/resume/queryResumeByUserId/',
	//新增用户简历
	ADD_JOB_RESUME: baseUrl + '/prod-api/api/job/resume',
	//查询用户简历
	FIND_JOB_RESUME: baseUrl + '/prod-api/api/job/resume/queryResumeByUserId/',
	//修改用户简历
	MODIFY_JOB_RESUME: baseUrl + '/prod-api/api/job/resume/',
	//投递简历
	JOB_DELIVER: baseUrl + '/prod-api/api/job/deliver',
	//获取投递记录
	DELIVER_RECORDS: baseUrl + '/prod-api/api/job/deliver/list',
	//获取所有广告轮播图
	ALL_AD_IMAGE: baseUrl + '/prod-api/api/gov-service-hotline/ad-banner/list',
	//获取所有祈求分类
	ALL_WISH_CATEGORY: baseUrl + '/prod-api/api/gov-service-hotline/appeal-category/list',
	//获取某个诉求分类下的所有诉求
	GET_APPEAL_LIST: baseUrl + '/prod-api/api/gov-service-hotline/appeal/list',
	//获取某个诉求列表的详细信息
	GET_APPEAL_DETAIL: baseUrl + '/prod-api/api/gov-service-hotline/appeal/',
	//创建提交诉求
	CREATE_APPEAL_WISH: baseUrl + '/prod-api/api/gov-service-hotline/appeal',
	//查询我提交的所有诉求
	GET_APPEAL_MY_LIST: baseUrl + '/prod-api/api/gov-service-hotline/appeal/my-list',
	//获取停哪儿的广告轮播图
	PARK_ROTATION_IMAGE: baseUrl + '/prod-api/api/park/rotation/list',
	//获取停车场列表信息
	GET_PARK_LIST: baseUrl + '/prod-api/api/park/lot/list',
	//获取停车场详细信息
	GET_PARK_DETAIL: baseUrl + '/prod-api/api/park/lot/',
	//查询停车记录列表
	GET_PARK_RECORD_LIST: baseUrl + '/prod-api/api/park/lot/record/list',
	//查询我的车辆信息
	GET_PARK_MY_CAR: baseUrl + '/prod-api/api/park/car/my',
	//添加我的车辆
	ADD_PARK_MY_CAR: baseUrl + '/prod-api/api/park/car'
	
}