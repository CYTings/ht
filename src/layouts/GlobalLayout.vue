<template>
	<a-layout>
		<!-- 导航布局：手机/pc侧栏 -->
		<sider-menu :theme="theme" :menuData="menuData" :collapsed="collapsed" :collapsible="true" />
		<!-- 内容区布局：头+内容+尾 -->
		<a-layout>
			<!-- 头部条 -->
			<global-header :menuData="menuData" :collapsed="collapsed" @toggleCollapse="toggleCollapse"/>
			<!-- 页面内容区，页面标签及页面路内插入插槽中 -->
			<a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
				<slot></slot>
			</a-layout-content>
			<!-- 底部 -->
			<!-- <a-layout-footer style="padding: 0px">
				<global-footer :copyright="copyright" />
			</a-layout-footer> -->
		</a-layout>
	</a-layout>
</template>

<script>
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import Drawer from '../components/tool/Drawer'
import SiderMenu from '../components/menu/SiderMenu'

const minHeight = window.innerHeight - 64 - 24 - 122

let menuData = []

export default {
	name: 'GlobalLayout',
	components: { SiderMenu, Drawer, GlobalFooter, GlobalHeader },
	data () {
		return {
			minHeight: minHeight + 'px',
			collapsed: false,
			menuData: menuData
		}
	},
	computed: {
		isMobile () {
			return this.$store.state.setting.isMobile
		},
		theme () {
			return this.$store.state.setting.theme
		},
		layout () {
			return this.$store.state.setting.layout
		},
		copyright () {
			return this.$store.state.setting.copyright
		}
	},
	methods: {
		toggleCollapse () {
			this.collapsed = !this.collapsed
		},
		onDrawerChange (show) {
			this.collapsed = show
		},
		onMenuSelect () {
			this.toggleCollapse()
		}
	},
	beforeCreate () {
		menuData = this.$router.options.routes.find((item) => item.path === '/').children
	}
}
</script>

<style lang="less" scoped>
	.setting {
		background-color: #1890ff;
		color: #fff;
		border-radius: 5px 0 0 5px;
		line-height: 40px;
		font-size: 22px;
		width: 40px;
		height: 40px;
		box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
	}
</style>
