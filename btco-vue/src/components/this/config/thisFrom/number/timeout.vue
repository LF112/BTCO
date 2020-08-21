<template>
	<div class="session_timeout">
		<div>
			<div class="left">
				<i class="el-icon-refresh-right"></i>
				<div>超时时间</div>
			</div>
			<el-divider direction="vertical"></el-divider>
			<div class="right">
				<el-input-number
					size="mini"
					v-model="timeOut"
					:precision="0"
				></el-input-number>
				<div>秒</div>
				<el-button
					size="mini"
					icon="el-icon-check"
					@click="save()"
				>保存</el-button>
			</div>
		</div>
		<div class="footer">
			<div>若在 {{panelTimeout}}秒 内无操作将自动退出面板</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	methods: {
		save() {
			this.Call.$emit('clickSaveConfig')
		},
	},
	computed: {
		...mapGetters('thisConfig', ['panelTimeout']),
		timeOut: {
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
	},
}
</script>

<style lang="less" scoped>
.session_timeout {
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
				margin-left: 10px;
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