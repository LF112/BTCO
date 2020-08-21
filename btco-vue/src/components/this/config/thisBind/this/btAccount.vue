<template>
	<div
		class="btAccount"
		style="opacity: 0; display: none"
		ref="btAccount"
	>
		<div>
			<div class="head">
				<div>
					<isIcon i="bt"></isIcon>
					<div>绑定宝塔账号</div>
				</div>
			</div>
			<div class="main">
				<div>
					<div>
						<p>用户名:</p>
						<el-input
							size="small"
							placeholder="在此键入宝塔官网账号用户名"
							v-model="userInput"
							clearable
						>
						</el-input>
					</div>
					<div>
						<p>密码:</p>
						<el-input
							size="small"
							placeholder="在此键入宝塔官网账号密码"
							v-model="passwordInput"
							show-password
						>
						</el-input>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="button">
					<el-button
						v-if="(IsBtAccount == '未绑定' || IsBtAccount == '' ? false : true)"
						size="mini"
						type="warning"
						@click="Untie()"
					>解绑</el-button>
					<el-button
						size="mini"
						type="success"
						@click="bind()"
					>{{ (IsBtAccount == '未绑定' || IsBtAccount == '' ? '绑定' : '重新绑定') }}</el-button>
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
			this.$refs.btAccount.style.opacity = 0
			setTimeout(() => (this.$refs.btAccount.style.display = 'none'), 500)
			this.$store.commit('thisConfig/changeShowBtAccount', false)
		},
		Untie() {
			const that = this

			this.close()
			this.$copop.warnUse('现在解绑宝塔账号？', (v) => {
				if (v) {
					that.$copop.load('正在解除绑定···', 2500)
					that.$http.get('/ssl?action=DelToken').then(
						(R) => {
							if (R.data.status) {
								that.$copop.success(R.data.msg, 2000)
								that.Call.$emit('reloadGetConfig')
							} else that.$copop.warn(R.data.msg, 2000)
						},
						(response) =>
							that.$copop.warn(
								'解绑失败，请检查网络或修复面板',
								2000
							)
					)
				}
			})
		},
		bind() {
			const that = this

			if (this.userInput == '') this.$copop.warn('用户名不能为空', 2000)
			else if (this.passwordInput == '')
				this.$copop.warn('密码不能为空', 2000)
			else {
				this.close()
				this.$copop.infoUse('现在绑定宝塔面板？', (v) => {
					if (v) {
						that.$copop.load('正在绑定···', 2500)
						that.$http
							.post(
								'/ssl?action=GetToken',
								{
									username: this.userInput,
									password: this.passwordInput,
								},
								{ emulateJSON: true }
							)
							.then(
								(R) => {
									if (R.data.status) {
										that.$copop.success(R.data.msg, 2000)
										that.Call.$emit('reloadGetConfig')
									} else that.$copop.warn(R.data.msg, 2000)
								},
								(response) =>
									that.$copop.warn(
										'绑定失败，请检查网络或修复面板',
										2000
									)
							)
					}
				})
			}
		},
	},
	data() {
		return {
			userInput: '',
			passwordInput: '',
		}
	},
	watch: {
		showBtAccount(v) {
			if (v) {
				this.$refs.btAccount.style.display = 'flex'
				setTimeout(() => (this.$refs.btAccount.style.opacity = 1), 1)
			} else {
				this.$refs.btAccount.style.opacity = 0
				setTimeout(
					() => (this.$refs.btAccount.style.display = 'none'),
					500
				)
			}
		},
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', ['showBtAccount', 'IsBtAccount']),
	},
}
</script>

<style lang="less" scoped>
.btAccount {
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