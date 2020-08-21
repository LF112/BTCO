<template>
	<div class="thisFrom">
		<div class="header">
			<i class="el-icon-setting"></i>
			<div class="title">基础设置</div>
		</div>
		<div>
			<div>
				<div>面板别名:</div>
				<el-input
					placeholder="给面板取个别名"
					size="small"
					prefix-icon="el-icon-s-home"
					v-model="titleIa"
					clearable
				></el-input>
			</div>
			<div>
				<div>域名:</div>
				<el-input
					placeholder="为面板绑定一个访问域名"
					size="small"
					prefix-icon="el-icon-monitor"
					v-model="domainIa"
					clearable
				></el-input>
			</div>
			<div>
				<div>授权IP:</div>
				<el-input
					placeholder="设置访问授权IP，多个请使用逗号( , )隔开"
					size="small"
					prefix-icon="el-icon-aim"
					v-model="authIpIa"
					clearable
				></el-input>
			</div>
			<div>
				<div>默认建站目录:</div>
				<el-input
					placeholder="新创建的站点，默认将保存到该目录的下级目录"
					size="small"
					prefix-icon="el-icon-link"
					v-model="pathIa"
					clearable
				></el-input>
			</div>
			<div>
				<div>默认备份目录:</div>
				<el-input
					placeholder="网站和数据库的备份目录"
					size="small"
					prefix-icon="el-icon-wallet"
					v-model="backPathIa"
					clearable
				></el-input>
			</div>
			<div>
				<div>服务器IP:</div>
				<el-input
					placeholder="默认为外网IP，虚拟机请填写内网IP"
					size="small"
					prefix-icon="el-icon-position"
					v-model="ipIa"
					clearable
				></el-input>
			</div>
		</div>
		<div class="footer">
			<div class="info">
				<div>修改完成后请及时保存</div>
			</div>
			<div class="button">
				<el-button
					size="mini"
					type="primary"
					@click="saveSetting()"
				>保存</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	mounted() {
		this.Call.$on('clickSaveConfig', (v) => this.saveSetting())
	},
	methods: {
		saveSetting() {
			const that = this
			if (!this.isDev)
				this.$copop.infoUse('现在保存配置？', (v) => {
					if (v) {
						that.$http
							.post(
								'/config?action=setPanel',
								{
									address: that.ipIa,
									backup_path: that.backPathIa,
									domain: that.domainIa,
									limitip: that.authIpIa,
									session_timeout: that.timeoutIa,
									sites_path: that.pathIa,
									systemdate: that.serverTimeIa,
									webname: that.titleIa,
									port: that.panelPortIa,
								},
								{ emulateJSON: true }
							)
							.then(
								(R) => {
									that.$copop.success('配置已保存~', 1500)
									that.Call.$emit('reloadGetConfig')
								},
								(response) =>
									that.$copop.warn(
										'保存配置失败，请检查网络或修复面板',
										2000
									)
							)
					}
				})
			else this.$copop.info('Dev 模式无法保存配置', 2000)
		},
	},
	computed: {
		...mapGetters('Global', ['isDev', 'isSiteNickname']),
		...mapGetters('thisConfig', [
			'panelDomain',
			'panelLimitip',
			'panelSitesPath',
			'panelBackupPath',
			'panelIp',
			'panelTimeout',
			'serverTime',
			'panelPort',
		]),
		titleIa: {
			get() {
				return this.isSiteNickname
			},
			set(v) {
				this.$store.commit('Global/updateIsSiteNickname', v)
			},
		},
		domainIa: {
			get() {
				return this.panelDomain
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelDomain',
					v,
				])
			},
		},
		authIpIa: {
			get() {
				return this.panelLimitip
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelLimitip',
					v,
				])
			},
		},
		pathIa: {
			get() {
				return this.panelSitesPath
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelSitesPath',
					v,
				])
			},
		},
		backPathIa: {
			get() {
				return this.panelBackupPath
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelBackupPath',
					v,
				])
			},
		},
		ipIa: {
			get() {
				return this.panelIp
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', ['panelIp', v])
			},
		},
		timeoutIa: {
			get() {
				return this.panelTimeout
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelTimeout',
					v,
				])
			},
		},
		serverTimeIa: {
			get() {
				return this.serverTime
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'serverTime',
					v,
				])
			},
		},
		panelPortIa: {
			get() {
				return this.panelPort
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', ['panelPort', v])
			},
		},
	},
}
</script>

<style lang="less" scoped>
.thisFrom {
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
		margin-top: 4px;
		padding: 0 15px;
		> div {
			width: 98%;
			margin: 4px;
			> div {
				color: #fff;
				font-size: 12px;
				margin-bottom: 2px;
			}
		}
	}
	.footer {
		width: 100%;
		position: relative;
		margin-top: 8px;
		display: flex;
		.info {
			padding: 2px;
			width: 212px;
			border-radius: 0 2px 0 2px;
			margin-bottom: 8px;
			margin-left: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			> div {
				color: #fff;
				font-size: 12px;
			}
		}
		.button {
			position: relative;
			width: 100%;
			padding: 0 8px 8px 0;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.el-button + .el-button {
				margin-left: 8px;
			}
			> button {
				color: #fff;
			}
		}
	}
}
</style>