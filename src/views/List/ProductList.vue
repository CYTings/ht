<template>
	<div class="list">
		<div class="conditionlist">
			<div class="condition_one">
				<span class="label_title">日期</span>
				<a-range-picker @change="changeDate" />
			</div>
			<div class="condition_one">
				<span class="label_title">客户信息</span>
				<a-input placeholder="请输入客户信息" @change="getCusInfo($event)" />
			</div>
			<div class="condition_one">
				<span class="label_title">目的地</span>
				<a-input placeholder="请输入目的地" @change="getDestination($event)" />
			</div>
			<a-button type="primary" style="margin-left: 12px;" @click="getQW">查询</a-button>
		</div>

		<a-table :columns="columns" :data-source="data" bordered :loading="loadingMore">
            <span slot="action" slot-scope="text">
                <a href="javascript:;" @click="getDGEW(text.id)">详情</a>
            </span>
        </a-table>

		<a-modal
			width="80%"
			:closable='false'
			:visible="visible"
			@ok="closeModal"
			@cancel="closeModal"
			>
			<div id="printImg">
				<img :src="imgsrc"  style="width: 100%"/>
			</div>

			<a-button type="primary" v-print="'#printImg'" style="margin-top: 12px;">打印</a-button>

		</a-modal>
	</div>
</template>

<script>

const columns = [
	{
        title: '单号',
        key: 'billNo',
        dataIndex: 'billNo'
	},
	// {
    //     title: '状态',
    //     key: 'status',
    //     dataIndex: 'status'
	// },
	// {
    //     title: '揽件时间',
    //     key: 'datetime',
    //     dataIndex: 'datetime'
	// },
	{
        title: '收件代号',
        key: 'receipt_CodeNo',
        dataIndex: 'receipt_CodeNo'
	},
	// {
    //     title: '收件单位/个人',
    //     key: 'receipt_Address',
	// 	dataIndex: 'receipt_Address'
	// },
	{
        title: '联系人',
        key: 'receipt_LinkMan',
        dataIndex: 'receipt_LinkMan'
	},
	{
        title: '联系方式',
        key: 'receipt_TelPhone',
        dataIndex: 'receipt_TelPhone'
	},
	{
        title: '目的地',
        key: 'destination_Name',
        dataIndex: 'destination_Name'
	},
	{
        title: '件数',
        key: 'quantity',
        dataIndex: 'quantity'
	},
	{
        title: '重量',
        key: 'weight',
        dataIndex: 'weight'
	},
	{
        title: '体积',
        key: 'volume',
        dataIndex: 'volume'
	},
	// {
    //     title: '运费',
    //     key: 'deliveryFee',
    //     dataIndex: 'deliveryFee'
	// },
	{
        title: '中转费',
        key: 'transferFee',
        dataIndex: 'transferFee'
	},
	{
        title: '送费',
        key: 'deliveryFee',
        dataIndex: 'deliveryFee'
	},
	{
        title: '进仓费',
        key: 'warehouseEntryFee',
        dataIndex: 'warehouseEntryFee'
	},
	{
        title: '仓储费',
        key: 'warehousingCharges',
        dataIndex: 'warehousingCharges'
	},
	{
        title: '服务费',
        key: 'serviceFee',
        dataIndex: 'serviceFee'
	},
	{
        title: '结算方式',
        key: 'payWay',
        dataIndex: 'payWay'
	},
	{
        title: '合计金额',
        key: 'paymentAmount',
        dataIndex: 'paymentAmount'
	},
	// {
    //     title: '代收货款',
    //     key: 'collecting',
    //     dataIndex: 'collecting'
	// },
	{
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' }
}];

export default {
	name: 'ProductList',
	data() {
		const date = new Date()
		return {
			data: [],
			columns,
			StartDT: '2020-01-01',
			EndDT: date,
			CusInfo: '',
			Destination: '',
			loadingMore: true,
			imgsrc: '',
			visible: false
		}
	},
	methods: {
		changeDate(date, dateString) {
			this.StartDT = dateString[0];
			this.EndDT = dateString[1];
		},
		getCusInfo(e) {
			this.CusInfo = e.target.value;
		},
		getDestination(e) {
			this.Destination = e.target.value;
		},
		getQW() {
			this.$axios.put('/api/DG/QW', {
				StartDT: this.StartDT,
				EndDT: this.EndDT,
				CusInfo: this.CusInfo,
				Destination: this.Destination
			}).then((res) => {
				if (res.code === 200) {
					this.data = res.data;
					this.loadingMore = false
				}
			})
		},
		getDGEW(id) {
			this.$message.info('加载中...', 1);

			this.$axios.get(`/api/DG/EW/${id}`, {} , 'arraybuffer').then((res) => {
				let blob = new Blob([res], {
					type: 'imageType'
				})
				let imageUrl = window.URL.createObjectURL(blob);
				this.imgsrc = imageUrl;
				this.visible = true;
			})
		},

		closeModal(e) {
			this.visible = false;
			this.imgsrc = '';
		}
	},
	created() {
		this.getQW();
	}
}
</script>

<style lang="less" scoped>
	img {
		width: 100%;
		display: block;
	}

	.list {
		width: 100%;
		background-color: #fff;
	}
	
	.conditionlist {
		width: 100%;
		box-sizing: border-box;
		padding: 12px;
		display: flex;
		flex-wrap: wrap;
		.condition_one {
			display: flex;
			align-items: center;
			margin-bottom: 12px;
			.label_title {
				width: 120px;
				text-align: center;
				display: inline-block;
				margin-right: 6px;
			}
		}
	}
</style>
