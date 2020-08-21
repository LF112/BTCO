<template>
	<div
		class="uploadView"
		ref="uploadView"
		style="opacity: 0; display: none"
	>
		<div>
			<div class="head">
				<div>
					<i
						:style="(changeStatus ? 'color: #f56c6c' : '')"
						:class="(changeStatus ? 'el-icon-warning-outline' : (openUV.upload ? 'el-icon-refresh' : 'el-icon-circle-check'))"
					></i>
					<div :style="(changeStatus ? 'color: #f56c6c' : '')">{{ 
                        changeStatus ? 
                            '请查看' + (isTEST ? '正式版' : '测试版' ) + '版本变化'
                        : (openUV.upload ? 
                            '有新版本 -> ' + (isTEST ? 'T'
                            : 'V') + openUV[(isTEST ? 'beta' : 'default')].version : '当前为最新版')
                    }}</div>
				</div>
			</div>
			<div class="main">
				<div>
					<p v-html="openUV[(isTEST ? (changeStatus ? 'default' : 'beta') : (changeStatus ? 'beta' : 'default'))].UPLOG"></p>
				</div>
			</div>
			<div class="bottom">
				<div class="version">
					<div>{{ (changeStatus ? (isTEST ? '正式版' : '测试版') : (isTEST ? '测试版' : '正式版')) }}</div>
					<el-divider direction="vertical"></el-divider>
					<div>{{ openUV[(isTEST ? (changeStatus ? 'default' : 'beta') : (changeStatus ? 'beta' : 'default'))].version }}</div>
				</div>
				<div class="button">
					<el-button
						size="mini"
						:icon="(changeStatus ? 'el-icon-check' : 'el-icon-refresh-right')"
						:type="(changeStatus ? 'success' : '')"
						@click="changeVersion(isTEST)"
					>{{ (changeStatus ? '就绪' : (isTEST ? '正式版' : '测试版')) }}</el-button>
					<el-button
						size="mini"
						type="primary"
						@click="close()"
					>取消</el-button>
					<el-button
						v-if="openUV.upload && !changeStatus"
						size="mini"
						type="success"
						@click="uploadPanel()"
					>升级</el-button>
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
			this.$refs.uploadView.style.opacity = 0
			setTimeout(
				() => (this.$refs.uploadView.style.display = 'none'),
				500
			)
			this.openUV.show = false
			this.changeStatus = false
			this.$store.commit('thisIndex/changeOpenUV', this.openUV)
		},
		changeVersion(i) {
			const that = this
			if (i)
				if (this.changeStatus) {
					// 正式版
					this.close()
					this.$copop.warnUse('现在切换正式版？', (v) => {
						// 宝塔奇妙的算法，绝了
						if (v && !that.isDev) {
							that.$copop.info('正在发起切换······')
							that.$http.get('/ajax?action=to_not_beta').then(
								(R) => {
									if (R.data.status) {
										that.$copop.info('正在检查···')
										// CHECK 升级 / 更新 面板
										that.changePanelV('切换正式版')
									} else that.$copop.warn(R.data.msg, 2000)
								},
								(response) =>
									that.$copop.warn(
										'发起失败！请检查网络或修复面板',
										2000
									)
							)
						} else if (that.isDev)
							that.$copop.warn('Dev 模式不支持切换', 2000)
					})
				} else this.changeStatus = true
			else if (this.changeStatus) {
				// 测试版
				this.close()
				this.$copop.warn(
					'请不要在正式商用网站及生产环境切换测试版',
					2500
				)
				this.$copop.warnUse('现在切换测试版？', (v) => {
					if (v && !that.isDev) {
						// BATE 预申请
						that.$copop.info('正在申请测试版······')
						that.$http.get('/ajax?action=apple_beta').then(
							(R) => {
								if (R.data.status) {
									that.$copop.info('正在检查···')
									// CHECK 升级 / 更新 面板
									that.changePanelV('切换测试版')
								} else that.$copop.warn(R.data.msg, 2000)
							},
							(response) =>
								that.$copop.warn(
									'申请失败！请检查网络或修复面板',
									2000
								)
						)
					} else if (that.isDev)
						that.$copop.warn('Dev 模式不支持切换', 2000)
				})
			} else this.changeStatus = true
		},
		changePanelV(name) {
			const that = this
			if (!this.isDev)
				this.$http
					.post(
						'/ajax?action=UpdatePanel',
						{ check: true },
						{ emulateJSON: true }
					)
					.then(
						(R) => {
							that.$copop.load('正在' + name + '，请耐心等待···')
							that.$http
								.post(
									'/ajax?action=UpdatePanel',
									{ toUpdate: 'yes' },
									{ emulateJSON: true }
								)
								.then(
									(V) => {
										if (V.data.status) {
											that.$copop.success(
												V.data.msg + '，正在重启面板···'
											)
											that.$http
												.get('/system?action=ReWeb')
												.then((R) => {
													that.$copop.success(
														'服务已重启！'
													)
													setTimeout(
														() =>
															window.location.reload(),
														1500
													)
												})
										} else
											that.$copop.warn(V.data.msg, 2000)
									},
									(response) =>
										that.$copop.warn(
											name + '失败！请检查网络或修复面板',
											2000
										)
								)
						},
						(response) =>
							that.$copop.warn(
								'检查失败！请检查网络或修复面板',
								2000
							)
					)
			else that.$copop.warn('Dev 模式不支持切换面板版本', 2000)
		},
		uploadPanel() {
			const that = this
			this.close()
			this.$copop.warnUse('现在更新面板？', (v) => {
				if (v && !that.isDev) {
					that.$copop.load('正在更新面板，请耐心等待···')
					that.$http
						.post(
							'/ajax?action=UpdatePanel',
							{ toUpdate: 'yes' },
							{ emulateJSON: true }
						)
						.then(
							(V) => {
								if (V.data.status) {
									that.$copop.success(
										V.data.msg + '，正在重启面板···'
									)
									that.$http
										.get('/system?action=ReWeb')
										.then((R) => {
											that.$copop.success('服务已重启！')
											setTimeout(
												() => window.location.reload(),
												1500
											)
										})
								} else
									that.$copop.warn('升级失败，请尝试刷新网页')
							},
							(response) =>
								that.$copop.warn(
									name + '失败！请检查网络或修复面板',
									2000
								)
						)
				} else if (that.isDev)
					that.$copop.warn('Dev 模式不支持更新面板', 2000)
			})
		},
	},
	watch: {
		'openUV.show': function (v) {
			if (v) {
				this.$refs.uploadView.style.display = 'flex'
				setTimeout(() => (this.$refs.uploadView.style.opacity = 1), 1)
			} else {
				this.$refs.uploadView.style.opacity = 0
				setTimeout(
					() => (this.$refs.uploadView.style.display = 'none'),
					500
				)
			}
		},
	},
	data() {
		return {
			changeStatus: false,
		}
	},
	computed: {
		...mapGetters('thisIndex', ['openUV', 'isTEST']),
	},
}
</script>

<style lang="less" scoped>
.uploadView {
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
				width: 80%;
				> p {
					color: #fff;
					font-size: 12px;
				}
			}
		}
		.bottom {
			width: 100%;
			position: relative;
			margin-top: 8px;
			display: flex;
			.version {
				padding: 2px;
				width: 140px;
				border-radius: 0 2px 0 2px;
				/*background: #303030;*/
				margin-bottom: 8px;
				margin-left: 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				.el-divider {
					background: #fff;
				}
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