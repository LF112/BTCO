<template>
	<div
		class="panelApi"
		style="opacity: 0; display: none"
		ref="panelApi"
	>
		<div>
			<div class="head">
				<div>
					<i class="el-icon-s-promotion"></i>
					<div>此面板上的 API 配置项</div>
				</div>
			</div>
			<div class="main">
				<div>
					<div class="token">
						<i class="el-icon-paperclip"></i>
						<div ref="thisToken">{{ isAPI.token }}</div>
					</div>
					<div class="tokenMenu">
						<el-button
							size="mini"
							icon="el-icon-refresh"
							@click="refreshToken()"
						>重置 TOKEN</el-button>
						<el-button
							size="mini"
							type="primary"
							@click="copyToken()"
						>复制</el-button>
					</div>
					<el-divider></el-divider>
					<div class="limitAddr">
						<div class="title">
							<i class="el-icon-finished"></i>
							<div>IP 白名单 [ 一行一条 IP 地址 ]</div>
						</div>
						<!-- 后续建议改成更人性化的方式 -->
						<textarea
							rows="8"
							cols="45"
							aria-required="true"
							placeholder="在此输入..."
							ref="valLimitAddr"
							:value="isAPI.limit_addr"
						></textarea>
						<div class="PS">
							<div><i class="el-icon-warning-outline"></i>开启API后，必需在IP白名单列表中的IP才能访问面板API接口</div>
							<div><i class="el-icon-help"></i>如需本机调用面板API密钥，请添加 '127.0.0.1' 和本机IP至IP白名单</div>
							<div><i class="el-icon-s-help"></i>API 文档: https://www.bt.cn/bbs/thread-20376-1-1.html</div>
						</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="status">
					<div>{{ (isAPI.open ? 'API 已启用' : 'API 已禁用') }}</div>
				</div>
				<div class="button">
					<el-button
						size="mini"
						:type="(isAPI.open ? 'warning' : '')"
						:icon="(isAPI.open ? 'el-icon-open' : 'el-icon-turn-off')"
						@click="changeApiOpen()"
					>{{ (isAPI.open ? '禁用' : '启用') }}</el-button>
					<el-button
						size="mini"
						type="success"
						@click="saveLimitAddr()"
					>保存</el-button>
					<el-button
						size="mini"
						type="primary"
						@click="close()"
					>取消</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	methods: {
		close() {
			this.$refs.panelApi.style.opacity = 0
			setTimeout(() => (this.$refs.panelApi.style.display = 'none'), 500)
			this.$store.commit('thisConfig/changeShowAPI', false)
		},
		copyToken() {
			const that = this
			this.$copyText(that.isAPI.token).then(
				(R) => {
					that.$copop.success('复制成功~', 2500)
				},
				(response) =>
					that.$copop.warn('复制失败！请重试或手动复制', 2500)
			)
		},
		refreshToken() {
			const that = this
			if (!this.isDev) {
				this.$copop.load('正在重置 TOKEN ······', 2000)
				this.$http
					.post(
						'/config?action=set_token',
						{ t_type: 1 },
						{ emulateJSON: true }
					)
					.then(
						(R) => {
							that.$copop.success(
								'已重置，上一个 TOKEN 已失效',
								2000
							)
							that.isAPI.token = R.data.msg
							that.$store.commit(
								'thisConfig/updateIsAPI',
								that.isAPI
							)
						},
						(response) =>
							this.$copop.warn(
								'重置失败，请检查网络或修复面板',
								2500
							)
					)
			} else this.$copop.warn('Dev 模式无法重置 TOKEN')
		},
		saveLimitAddr() {
			const that = this
			if (!this.isDev) {
				this.$copop.load('正在保存 IP 白名单···', 2500)
				this.$http
					.post(
						'/config?action=set_token',
						{
							t_type: 3,
							limit_addr: that.$refs.valLimitAddr.value,
						},
						{ emulateJSON: true }
					)
					.then(
						(R) => {
							that.$copop.success('保存成功', 2000)
						},
						(response) =>
							this.$copop.warn(
								'保存失败，请检查网络或修复面板',
								2500
							)
					)
			} else this.$copop.warn('Dev 模式无法保存 IP 白名单')
		},
		changeApiOpen() {
			const that = this
			if (!this.isDev) {
				this.$copop.load(
					'正在' + (this.isAPI.open ? '禁用' : '启用') + '···',
					1500
				)
				this.$http
					.post(
						'/config?action=set_token',
						{ t_type: 2 },
						{ emulateJSON: true }
					)
					.then(
						(R) => {
							that.isAPI.open = that.isAPI.open ? false : true
							that.$store.commit(
								'thisConfig/updateIsAPI',
								that.isAPI
							)
							that.$copop.success(R.data.msg, 2000)
						},
						(response) =>
							this.$copop.warn(
								(this.isAPI.open ? '禁用' : '启用') +
									'失败，请检查网络或修复面板',
								2500
							)
					)
			} else this.$copop.warn('Dev 模式无法操作 API')
		},
	},
	watch: {
		showAPI(v) {
			if (v) {
				this.$refs.panelApi.style.display = 'flex'
				setTimeout(() => (this.$refs.panelApi.style.opacity = 1), 1)
			} else {
				this.$refs.panelApi.style.opacity = 0
				setTimeout(
					() => (this.$refs.panelApi.style.display = 'none'),
					500
				)
			}
		},
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', ['showAPI', 'isAPI']),
	},
}
</script>

<style lang="less" scoped>
.panelApi {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	background: hsla(0, 0%, 0%, 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: auto;
	> div {
		min-width: 300px;
		margin: 0 12px;
		background: #404040;
		border-radius: 2px;
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);

		.head {
			position: relative;
			width: 100%;
			margin-bottom: 5px;
			display: flex;
			justify-content: center;
			> div {
				padding: 8px 12px;
				width: 100%;
				display: flex;
				align-items: center;
				background: #303030;
				border-radius: 2px 2px 0 0;
				> i {
					color: #fff;
				}
				> svg {
					width: 16px;
					height: 16px;
				}
				> div {
					color: #fff;
					margin-left: 7px;
					font-size: 14px;
					font-weight: lighter;
				}
			}
		}
		.main {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			> div {
				width: 100%;
				padding: 0 12px;
			}
			.token {
				padding: 4px;
				background: #515151;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				> i {
					color: #fff;
					margin-right: 8px;
				}
				> div {
					font-size: 14px;
					color: #fff;
					line-height: 1;
				}
			}
			.tokenMenu {
				position: relative;
				width: 100%;
				margin: 4px 0 0;
				display: flex;
				align-items: center;
				justify-content: center;
				.el-button + .el-button {
					margin-left: 8px;
				}
				> button {
					color: #fff;
				}
			}
			.el-divider {
				margin: 8px auto;
				width: 92%;
				background-color: #c5c5c5;
			}
			.limitAddr {
				position: relative;
				display: inline-block;
				padding: 0 0 5px;
				width: 100%;
				height: 115px;
				> textarea {
					display: inline-block;
					margin: 10px 0 0;
					padding: 5px 8px;
					width: 100%;
					height: 110px;
					border: 1px solid #515151;
					border-radius: 2px;
					background-color: rgb(81, 81, 81);
					color: #e6e6e6;
					text-align: left;
					font-size: 12px;
					line-height: normal;
				}
				> textarea:focus {
					outline: none;
					border: 1px solid #303030;
				}
				> div {
					color: #fff;
					float: left;
					font-size: 12px;
					line-height: 1;
					display: flex;
					> i {
						color: #fff;
						font-size: 12px;
						margin-right: 8px;
					}
				}
				.PS {
					width: 100%;
					padding: 2px 10px 5px;
					text-align: left;
					display: contents;
					> div {
						color: #fff;
						font-size: 12px;
						> i {
							margin-right: 5px;
						}
					}
				}
			}
		}
		.bottom {
			width: 100%;
			position: relative;
			margin-top: 8px;
			display: flex;
			.status {
				padding: 2px;
				width: 140px;
				border-radius: 0 2px 0 2px;
				/*background: #303030;*/
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
}
</style>