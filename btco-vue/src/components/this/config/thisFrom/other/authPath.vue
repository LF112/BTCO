<template>
	<div class="panelAuthPath">
		<div>
			<div class="left">
				<i class="el-icon-guide"></i>
				<div>安全入口</div>
			</div>
			<el-divider direction="vertical"></el-divider>
			<div class="right">
				<el-input
					size="mini"
					placeholder="/BTCO_is_the_best"
					v-model="isPanelAuthPath"
					clearable
				>
				</el-input>
				<el-button
					size="mini"
					icon="el-icon-check"
					@click="save()"
				>修改</el-button>
			</div>
		</div>
		<div class="footer">
			<div>设置后只能通过指定安全入口登录面板</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	methods: {
		save() {
			const that = this
			if (!this.isDev) {
				this.$copop.load('正在修改入口···', 2000)
				this.$http
					.post(
						'/config?action=set_admin_path',
						{
							admin_path: this.isPanelAuthPath,
						},
						{ emulateJSON: true }
					)
					.then(
						(R) => {
							if (R.data.status) {
								that.$copop.success('修改成功~', 1500)
							} else that.$copop.warn(R.data.msg, 2500)
						},
						(response) =>
							this.$copop.warn(
								'修改入口失败，请检查网络或修复面板',
								2000
							)
					)
			} else this.$copop.warn('Dev 模式无法修改入口', 2000)
		},
	},
	computed: {
		...mapGetters('Global', ['isDev']),
		...mapGetters('thisConfig', ['panelAuthPath']),
		isPanelAuthPath: {
			get() {
				return this.panelAuthPath
			},
			set(v) {
				this.$store.commit('thisConfig/updatePanelIs', [
					'panelAuthPath',
					v,
				])
			},
		},
	},
}
</script>

<style lang="less" scoped>
.panelAuthPath {
	width: 100%;
	min-height: 40px;
	margin-top: 10px;
	border-radius: 2px;
	background-color: rgba(81, 81, 81, 0.48);
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
	> div:not(.footer) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		.left {
			min-width: 82px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12px 0;
			> i {
				color: #fff;
				font-size: 12px;
			}
			> div {
				color: #fff;
				font-size: 12px;
				margin-left: 8px;
			}
		}
		.el-divider {
			margin: 0;
			background-color: #fff;
			height: 55%;
		}
		.right {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			> div {
				font-size: 12px;
				color: #fff;
				padding: 0 4px;
			}
			> button {
				margin: 0 10px;
			}
		}
	}
	.footer {
		width: 100%;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #303030;
		border-radius: 0 0 2px 2px;
		> div {
			color: #fff;
			font-size: 12px;
		}
	}
}
</style>