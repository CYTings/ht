<template>
	<!-- 头部右侧用户头像，下拉菜单 -->
	<a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
		<!-- 显示区 -->
		<span style="cursor: pointer">
			<span>欢迎管理员: {{userinfo.name}}</span>
			<a-avatar class="avatar" shape="circle" src="https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"/>
		</span>
		<!-- 下拉菜单区  slot="overlay" -->
		<a-menu style="width: 120px" slot="overlay">
			<a-menu-item>
				<router-link to="/login">
					<a-icon type="poweroff" />
					<span style="margin-left: 10px;">退出登录</span>
				</router-link>
			</a-menu-item>
		</a-menu>
	</a-dropdown>
</template>

<script>
export default {
	name: 'HeaderAvatar',
	data() {
		return {
			userinfo: {}
		}
	},
	created() {
		const userinfo = localStorage.getItem('userinfo');
		this.userinfo = JSON.parse(userinfo);
	}
}
</script>

<style lang="less" scoped>
	.avatar {
		margin: 20px 0 20px 4px;
		color: #1890ff;
		background: hsla(0,0%,100%,.85);
		vertical-align: middle;
	}
</style>
