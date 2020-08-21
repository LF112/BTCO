<template>
	<div
		class="BasicAuth"
		style="opacity: 0; display: none"
		ref="BasicAuth"
	>
		<div>
			<div class="head">
				<div>
					<isIcon i="auth"></isIcon>
					<div>此面板上的 BasicAuth 配置项</div>
				</div>
			</div>
			<div class="main">
				<div>
					<div>
						<p>用户名:</p>
						<el-input
							size="small"
							placeholder="不修改请留空"
							v-model="userInput"
							clearable
						>
						</el-input>
					</div>
					<div>
						<p>密码:</p>
						<el-input
							size="small"
							placeholder="不修改请留空"
							v-model="passwordInput"
							show-password
						>
						</el-input>
					</div>
					<el-divider></el-divider>
					<div class="PS">
						<div><i class="el-icon-warning-outline"></i>请不要在这里使用您的常用密码，这可能导致密码泄漏！</div>
						<div><i class="el-icon-success"></i>开启后，能有效防止面板被扫描发现，但并不能代替面板本身的帐号密码</div>
						<div><i class="el-icon-help"></i>开启后，以任何方式访问面板，将先要求输入BasicAuth用户名和密码</div>
						<div><i class="el-icon-s-help"></i>如意外开启 BasicAuth 可登入终端执行：</div>
						<div style="text-align: center;">bt 23</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="status">
					<div>{{ IsBasicAuth.open ? '已开启' : '已关闭' }}</div>
				</div>
				<div class="button">
					<el-button
						size="mini"
						:type="(IsBasicAuth.open ? 'warning' : '')"
						:icon="(IsBasicAuth.open ? 'el-icon-open' : 'el-icon-turn-off')"
						@click="changeAuthOpen()"
					>{{ (IsBasicAuth.open ? '关闭' : '开启') }}</el-button>
					<el-button
						size="mini"
						type="success"
						@click="save()"
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
			this.$refs.BasicAuth.style.opacity = 0
			setTimeout(() => (this.$refs.BasicAuth.style.display = 'none'), 500)
			this.$store.commit('thisConfig/changeShowBasicAuth', false)
		},
		changeAuthOpen() {
			this.close()
			this.$copop.load('正在配置 BasicAuth ···')
			this.network(this.IsBasicAuth.open ? 'False' : 'True')
		},
		save() {
			const that = this
			this.close()
			this.$copop.infoUse('现在保存 BasicAuth 配置？', (v) => {
				if (v)
					if (!this.isDev) {
						if (that.IsBasicAuth.open) {
							that.$copop.load('正在保存 BasicAuth 配置···')
							that.network('True')
						} else
							that.$copop.warn(
								'仅在开启 BasicAuth 时可保存',
								2500
							)
					} else that.$copop.warn('Dev 模式无法操作 BasicAuth')
			})
		},
		network(v) {
			const that = this
			this.$http
				.post(
					'/config?action=set_basic_auth',
					{
						basic_user: that.userInput,
						basic_pwd: that.passwordInput,
						open: v,
					},
					{ emulateJSON: true }
				)
				.then(
					(R) => {
						if (R.data.status) {
							that.$copop.success('已配置')
							setTimeout(() => window.location.reload(), 2500)
						} else that.$copop.warn(R.data.msg, 2500)
					},
					(response) =>
						that.$copop.warn('操作失败，请检查网络或修复面板')
				)
		},
	},
	data() {
		return {
			userInput: '',
			passwordInput: '',
		}
	},
	watch: {
		showBasicAuth(v) {
			if (v) {
				this.$refs.BasicAuth.style.display = 'flex'
				setTimeout(() => (this.$refs.BasicAuth.style.opacity = 1), 1)
			} else {
				this.$refs.BasicAuth.style.opacity = 0
				setTimeout(
					() => (this.$refs.BasicAuth.style.display = 'none'),
					500
				)
			}
		},
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', ['showBasicAuth', 'IsBasicAuth']),
	},
}
</script>

<style lang="less" scoped>
.BasicAuth {
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
				> div {
					> p {
						color: #fff;
						font-size: 12px;
						margin-bottom: 5px;
					}
					.el-input {
						margin-bottom: 5px;
					}
				}
				.el-divider {
					margin: 4px auto;
					width: 92%;
					background-color: #c5c5c5;
				}
				.PS {
					width: 100%;
					padding: 2px 10px 5px;
					text-align: left;
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