// 页面设置
export default {
    namespaced: true,
    state: {
        isMobile: false,
        theme: 'dark',
        layout: 'side',
        systemName: '后台管理',
        copyright: '',
        multipage: true
    },
    mutations: {
        setDevice(state, isMobile) {
            state.isMobile = isMobile
        },
        setTheme(state, theme) {
            state.theme = theme
        },
        setLayout(state, layout) {
            state.layout = layout
        },
        setMultipage(state, multipage) {
            state.multipage = multipage
        }
    }
}