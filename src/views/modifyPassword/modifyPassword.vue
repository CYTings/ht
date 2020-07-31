<template>
	<div class="container">
		<div class="content">
			<div class="login">
				<a-form @submit="onSubmit" :form='form'>
					<a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;" v-model="activeKey" :animated='false'>
						<a-tab-pane tab="修改密码" key="account">
							<a-alert type="error" :closable="true" v-show="accountError" :message="accountError" showIcon style="margin-bottom: 24px;" />
							<a-form-item>
							<a-input
								size="large"
								placeholder="请输入用户id"
								v-decorator="[
								'UserId',
								{ rules: [{ required: true, message: '请输入用户id!' }] }
								]"
							>
								<a-icon slot="prefix" type="user" />
							</a-input>
							</a-form-item>
							<a-form-item>
                                <a-input
                                    size="large"
                                    placeholder="请输入旧密码"
                                    type="password"
                                    v-decorator="[
                                    'OldPwd',
                                    { rules: [{ required: true, message: '请输入旧密码!' }] }
                                    ]"
                                    @pressEnter='onSubmit'
                                >
                                    <a-icon slot="prefix" type="lock" />
                                </a-input>
							</a-form-item>
                            <a-form-item>
                                <a-input
                                    size="large"
                                    placeholder="请输入新密码"
                                    type="password"
                                    v-decorator="[
                                    'NewPwd',
                                    { rules: [{ required: true, message: '请输入新密码!' }] }
                                    ]"
                                    @pressEnter='onSubmit'
                                >
                                    <a-icon slot="prefix" type="lock" />
                                </a-input>
							</a-form-item>
						</a-tab-pane>
					</a-tabs>
					<a-form-item>
						<a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">确定</a-button>
					</a-form-item>
				</a-form>

			</div>
			
		</div>
		<!-- <global-footer :copyright="copyright" /> -->
	</div>
</template>

<script>

export default {
	name: 'modify',
	data () {
		return {
			logging: false,
			accountError: '',
			captchaError: '',
			activeKey: 'account',
			form: this.$form.createForm(this),
			lock: false
		}
	},
	computed: {
		systemName () {
			return this.$store.state.setting.systemName
		},
		copyright () {
			return this.$store.state.setting.copyright
		}
	},
	methods: {
		onSubmit (e) {
			if(this.lock) return;
			this.lock = true;
			e.preventDefault()
			const fields = ['UserId', 'OldPwd', 'NewPwd']
			this.form.validateFields(fields, {}, (err, values) => {
				if (!err) {
					this.logging = true
					let data = {
						UserId: this.form.getFieldValue('UserId'),
						OldPwd: this.form.getFieldValue('OldPwd'),
						NewPwd: this.form.getFieldValue('NewPwd')
                    }
					this.$axios.put('/api/US/CP', data).then((res) => {
						this.logging = false;
						this.lock = false;
						if (res.code === 200) {
							this.$router.push('/login')
						}
					})
				} else {
					console.log('err: ', err)
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: auto;
	background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px;
	background-size: 100%;
  	.content {
		padding: 32px 0;
		flex: 1;
		@media (min-width: 768px){
			padding: 112px 0 24px;
		}
    	.top {
      		text-align: center;
			.header {
				height: 44px;
				line-height: 44px;
				a {
					text-decoration: none;
				}
				.logo {
					height: 44px;
					vertical-align: top;
					margin-right: 16px;
				}
				.title {
					font-size: 33px;
					color: rgba(0,0,0,.85);
					font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
					font-weight: 600;
					position: relative;
					top: 2px;
				}
			}
			.desc {
				font-size: 14px;
				color: rgba(0,0,0,.45);
				margin-top: 12px;
				margin-bottom: 40px;
			}
		}
		.login {
			.modify_btn {
				color: #1890ff;
			}
			width: 368px;
			margin: 0 auto;
			@media screen and (max-width: 576px) {
				width: 95%;
			}
			@media screen and (max-width: 320px) {
				.captcha-button{
				font-size: 14px;
				}
			}
			.icon {
				font-size: 24px;
				color: rgba(0, 0, 0, 0.2);
				margin-left: 16px;
				vertical-align: middle;
				cursor: pointer;
				transition: color 0.3s;
				&:hover {
					color: #1890ff;
				}
			}
		}
	}
}
</style>
