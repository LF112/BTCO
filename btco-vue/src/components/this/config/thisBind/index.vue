<template>
	<div class="thisBind">
		<div class="header">
			<i class="el-icon-tickets"></i>
			<div class="title">账户配置</div>
		</div>
		<div>
			<div
				v-for="(v, index) in accountArr"
				:key="index"
			>
				<div class="account">
					<i
						:class="v.icon"
						v-if="!v.i"
					></i>
					<isIcon
						:i="v.icon"
						v-if="v.i"
					></isIcon>
					<span>{{ (v.user == '' ? '未设置' : v.user) }}</span>
					<nav></nav>
					<div>
						<el-divider direction="vertical"></el-divider>
						<p>{{ v.tip }}</p>
					</div>
				</div>
				<el-button
					size="mini"
					@click="click(v.click)"
				>{{ v.button }}</el-button>
			</div>
		</div>
		<PanelAccount />
		<BtAccount />
		<WeChatApp />
		<BasicAuth />
	</div>
</template>

<script>
import PanelAccount from './this/panelAccount'
import BtAccount from './this/btAccount'
import WeChatApp from './this/weChatApp'
import BasicAuth from './this/basicAuth'
import { mapGetters } from 'vuex'
export default {
	mounted() {
		// BT_CONFIG 在 viewHeader.vue 获取了，watch失效
		this.accountArr[0].user = this.IsPanelAccount
	},
	methods: {
		click(is) {
			if (is == 'panelAccount')
				this.$store.commit('thisConfig/changeShowPanelAccount', true)
			else if (is == 'btAccount')
				this.$store.commit('thisConfig/changeShowBtAccount', true)
			else if (is == 'wechatApp')
				this.$store.commit('thisConfig/changeShowWechatApp', true)
			else if (is == 'basicAuth')
				this.$store.commit('thisConfig/changeShowBasicAuth', true)
		},
	},
	data() {
		return {
			accountArr: [
				{
					user: '',
					tip: '面板账户',
					icon: 'el-icon-user',
					button: '修改',
					click: 'panelAccount',
				},
				{
					user: '',
					tip: '宝塔账号',
					icon: 'bt',
					i: true,
					button: '绑定',
					click: 'btAccount',
				},
				{
					user: '',
					tip: '微信小程序',
					icon: 'el-icon-connection',
					button: '绑定',
					click: 'wechatApp',
				},
				{
					user: '',
					tip: 'BasicAuth',
					icon: 'auth',
					i: true,
					button: '配置',
					click: 'basicAuth',
				},
			],
		}
	},
	watch: {
		IsPanelAccount(v) {
			this.accountArr[0].user = v
		},
		IsBtAccount(v) {
			this.accountArr[1].user = v
		},
		IsWechatApp(v) {
			this.accountArr[2].user = v
		},
		IsBasicAuth(v) {
			this.accountArr[3].user = v.value
		},
	},
	components: {
		PanelAccount,
		BtAccount,
		WeChatApp,
		BasicAuth,
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', [
			'IsPanelAccount',
			'IsBtAccount',
			'IsWechatApp',
			'IsBasicAuth',
		]),
	},
}
</script>

<style lang="less" scoped>
.thisBind {
	width: 100%;
	margin-top: 10px;
	border-radius: 2px;
	background-color: rgba(81, 81, 81, 0.48);
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
	.header {
		width: 100%;
		padding: 4px;
		display: flex;
		align-items: center;
		background: #303030;
		border-radius: 2px 2px 0 0;
		> i {
			color: #fff;
			font-size: 12px;
			margin: 0 5px;
		}
		.title {
			color: #fff;
			font-size: 12px;
			margin: 3px 0;
		}
	}
	> div:not(.header):not(.footer) {
		width: 100%;
		height: 100%;
		padding: 5px;
		> div {
			width: 100%;
			height: 30px;
			padding: 0 15px;
			display: flex;
			align-items: center;
			margin: 4px 0;
			.account {
				width: 100%;
				height: 85%;
				padding: 2px 8px;
				background: #303030;
				border-radius: 2px;
				display: flex;
				align-items: center;
				margin-right: 15px;
				> i {
					color: #fff;
					font-size: 12px;
				}
				> svg {
					width: 12px;
					height: 12px;
				}
				> span {
					color: #fff;
					font-size: 12px;
					margin-left: 8px;
				}
				> nav {
					flex-grow: 1;
					flex-shrink: 0;
				}
				> div {
					min-width: 75px;
					margin-left: 8px;
					display: flex;
					align-items: center;
					> p {
						width: 100%;
						text-align: center;
						font-size: 12px;
						color: #fff;
						margin-left: 8px;
					}
					.el-divider {
						margin: 0;
						background-color: #fff;
					}
				}
			}
			.el-button {
				color: #fff;
			}
		}
	}
}
</style>