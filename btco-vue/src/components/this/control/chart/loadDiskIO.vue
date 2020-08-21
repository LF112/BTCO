<template>
	<article class="loadDiskIO">
		<div class="header">
			<isIcon i=""></isIcon>
			<div class="title"></div>
		</div>
		<div>
			<div>

			</div>
		</div>
	</article>
</template>

<style lang="less" scoped>
.loadDiskIO {
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
		> svg {
			width: 12px;
			height: 12px;
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
		padding: 0 12px 4px;
		> div {
		}
	}
}
</style>