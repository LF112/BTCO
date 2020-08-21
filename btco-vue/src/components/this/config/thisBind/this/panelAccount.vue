<template>
	<div
		class="panelAccount"
		style="opacity: 0; display: none"
		ref="panelAccount"
	>
		<div>
			<div class="head">
				<div>
					<i :class="(change ? 'el-icon-key' : 'el-icon-user')"></i>
					<div>{{(change ? '更变此面板上的密码' : '更变此面板上的用户名')}}</div>
				</div>
			</div>
			<div class="main">
				<div v-if="!change">
					<div>
						<p>新的用户名:</p>
						<el-input
							size="small"
							placeholder="在此键入，长度不能小于三位"
							v-model="userInput"
							clearable
						>
						</el-input>
					</div>
					<div>
						<p>重复用户名:</p>
						<el-input
							size="small"
							placeholder="在此键入，再输入一次"
							v-model="repeatInput"
							clearable
						>
						</el-input>
					</div>
				</div>
				<div v-if="change">
					<div>
						<p>新的密码:</p>
						<el-input
							size="small"
							placeholder="在此键入，长度不能小于八位"
							v-model="passwordInput"
							show-password
						>
						</el-input>
					</div>
					<div>
						<p>重复密码:</p>
						<el-input
							size="small"
							placeholder="在此键入，再输入一次"
							v-model="repeatPasswordInput"
							show-password
						>
						</el-input>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="button">
					<el-button
						size="mini"
						icon="el-icon-refresh-right"
						@click="Switch()"
					>{{ change ? '切换为更变用户名' : '切换为更变密码' }}</el-button>
					<el-button
						size="mini"
						type="success"
						@click="Save()"
					>修改</el-button>
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
			this.$refs.panelAccount.style.opacity = 0
			setTimeout(
				() => (this.$refs.panelAccount.style.display = 'none'),
				500
			)
			this.$store.commit('thisConfig/changeShowPanelAccount', false)
		},
		Switch() {
			this.change = this.change ? false : true
		},
		Save() {
			if (!this.isDev)
				if (!this.change) {
					let checks = ['admin', 'root', 'admin123', '123456'],
						that = this

					if (this.userInput == '' || this.userInput.length < 3)
						this.$copop.warn('用户名不能为空或小于三位', 2000)
					else if (checks.indexOf(this.userInput) > -1)
						this.$copop.warn('禁止使用常用用户名', 2000)
					else if (this.userInput !== this.repeatInput)
						this.$copop.warn('两次输入的用户名不一致', 2000)
					else {
						this.close()
						this.$copop.infoUse('现在保存更改用户名吗', (v) => {
							if (v) {
								that.$copop.load('正在更改用户名···', 2500)
								that.$http
									.post(
										'/config?action=setUsername',
										{
											username1: that.userInput,
											username2: that.repeatInput,
										},
										{ emulateJSON: true }
									)
									.then(
										(R) => {
											that.$copop.success(
												R.data.msg,
												2000
											)
											setTimeout(
												() => window.location.reload(),
												2500
											)
										},
										(response) =>
											that.$copop.warn(
												'更改失败，请检查网络或修复面板',
												2000
											)
									)
							}
						})
					}
				} else {
					let checks = [
							'admin888',
							'123123123',
							'12345678',
							'45678910',
							'87654321',
							'asdfghjkl',
							'password',
							'qwerqwer',
						],
						pchecks = 'abcdefghijklmnopqrstuvwxyz1234567890',
						checkPassword = this.passwordInput.toLowerCase(),
						isError = '',
						that = this

					for (let i = 0; i < pchecks.length; i++)
						checks.push(
							pchecks[i] +
								pchecks[i] +
								pchecks[i] +
								pchecks[i] +
								pchecks[i] +
								pchecks[i] +
								pchecks[i] +
								pchecks[i]
						)

					for (let i = 0; i < checks.length; i++)
						if (checkPassword == checks[i]) {
							isError += '[' + checks[i] + ']'
						}

					if (
						this.passwordInput == '' ||
						this.passwordInput.length < 8
					)
						this.$copop.warn('密码不能为空或小于八位', 2000)
					else if (isError !== '')
						this.$copop.warn(
							'面板密码不能为弱口令 ' + isError,
							2000
						)
					else if (this.passwordInput !== this.repeatPasswordInput)
						this.$copop.warn('两次输入的密码不一致', 2000)
					else {
						this.close()
						this.$copop.infoUse('现在保存更改密码吗', (v) => {
							if (v) {
								that.$copop.load('正在更改密码···', 2500)
								that.$http
									.post(
										'/config?action=setPassword',
										{
											password1: that.passwordInput,
											password2: that.repeatPasswordInput,
										},
										{ emulateJSON: true }
									)
									.then(
										(R) => {
											that.$copop.success(
												R.data.msg,
												2000
											)
										},
										(response) =>
											that.$copop.warn(
												'更改失败，请检查网络或修复面板',
												2000
											)
									)
							}
						})
					}
				}
			else this.$copop.info('Dev 模式无法更改用户名或密码', 1500)
		},
	},
	data() {
		return {
			change: false,
			userInput: '',
			repeatInput: '',
			passwordInput: '',
			repeatPasswordInput: '',
		}
	},
	watch: {
		showPanelAccount(v) {
			if (v) {
				this.$refs.panelAccount.style.display = 'flex'
				setTimeout(() => (this.$refs.panelAccount.style.opacity = 1), 1)
			} else {
				this.$refs.panelAccount.style.opacity = 0
				setTimeout(
					() => (this.$refs.panelAccount.style.display = 'none'),
					500
				)
			}
		},
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', ['showPanelAccount']),
	},
}
</script>

<style lang="less" scoped>
.panelAccount {
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
				padding: 0 8px 8px;
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
		}
	}
}
</style>