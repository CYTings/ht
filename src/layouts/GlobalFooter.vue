<template>
	<div class="footer">
		<!-- 尾部出版信息 -->
		<!-- <div class="copyright">
			{{'Copyright '}}<a-icon type="copyright" />{{copyright}}
		</div> -->
	</div>
</template>

<script>
export default {
	name: 'GlobalFooter',
	props: ['copyright']
}
</script>

<style lang="less" scoped>

	.footer {
		padding: 0 16px;
		margin: 10px 0;
		text-align: center;
		.copyright {
			color: rgba(0,0,0,.45);
			font-size: 14px;
		}
		.links {
			margin-bottom: 8px;
			a:not(:last-child) {
				margin-right: 40px;
			}
			a {
				color: rgba(0,0,0,.45);
				-webkit-transition: all .3s;
				transition: all .3s;
			}
		}
	}
</style>
