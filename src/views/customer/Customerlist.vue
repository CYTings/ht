<template>
	<div class="list">
		<div class="conditionlist">

			<div class="condition_one">
				<span class="label_title">客户信息</span>
				<a-input placeholder="请输入客户信息" @change="getCusInfo($event)" />
			</div>
			<div class="condition_one">
				<span class="label_title">目的地</span>
				<a-input placeholder="请输入目的地" @change="getDestination($event)" />
			</div>
			<a-button type="primary" style="margin-left: 12px;" @click="getCUQC">查询</a-button>

		</div>

        <a-table :columns="columns" :data-source="infodata">
			<span slot="action" slot-scope="text">
                <a href="javascript:;" @click="getCUCD(text)">详情</a>
            </span>
        </a-table>

		<a-modal
			width="80%"
			:closable='false'
			:visible="visible"
			@ok="closeModal"
			@cancel="closeModal"
		>
            <div class="item_one">
                <span class="item_label">客户代号</span>
                <span>{{customer.codeNo}}</span>
            </div>
            <div class="item_one">
                <span class="item_label">收件单位</span>
                <span>{{customer.name}}</span>
            </div>
            <div class="item_one">
                <div class="item_left">
                    <span class="item_label">联系人</span>
                    <span>{{customer.linkMan}}</span>
                </div>
                <div>
                    <span class="item_label">联系电话</span>
                    <span>{{customer.telPhone}}</span>
                </div>
            </div>
            <div class="item_one">
                <div class="item_left">
                    <span class="item_label">目的地</span>
                    <span>{{customer.destination}}</span>
                </div>
                <div>
                    <span class="item_label">结算方式</span>
                    <span>{{customer.payWay}}</span>
                </div>
            </div>
            <div class="item_one">
                <span class="item_label">地址</span>
                <span>{{customer.address}}</span>
            </div>

            <div class="detial">
                <div class="title">本年发货信息</div>
                <div class="total_info" style="text-align: left;">
                    <span class="info_one" style="padding-left: 6px;">全年合计</span>
                    <span class="info_one" style="padding-left: 6px;">发货次数 {{records.thisYear_Count}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计运费 {{records.thisYear_Amount}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计重量 {{records.thisYear_Weight}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计体积 {{records.thisYear_Volume}}</span>
                </div>
				<div class="total_info">
					<span class="info_one">月份</span>
					<span class="info_one">一月</span>
					<span class="info_one">二月</span>
					<span class="info_one">三月</span>
					<span class="info_one">四月</span>
					<span class="info_one">五月</span>
					<span class="info_one">六月</span>
					<span class="info_one">七月</span>
					<span class="info_one">八月</span>
					<span class="info_one">九月</span>
					<span class="info_one">十月</span>
					<span class="info_one">十一月</span>
					<span class="info_one">十二月</span>
				</div>
				<div class="total_info">
					<span class="info_one">发货次数</span>
					<span class="info_one">{{records.thisMonth_Jan ? records.thisMonth_Jan.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Feb ? records.thisMonth_Feb.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Mar ? records.thisMonth_Mar.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Apr ? records.thisMonth_Apr.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_May ? records.thisMonth_May.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Jun ? records.thisMonth_Jun.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Jul ? records.thisMonth_Jul.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Aug ? records.thisMonth_Aug.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Sep ? records.thisMonth_Sep.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Oct ? records.thisMonth_Oct.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Nov ? records.thisMonth_Nov.count : 0}}</span>
					<span class="info_one">{{records.thisMonth_Dec ? records.thisMonth_Dec.count : 0}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计运费</span>
					<span class="info_one">{{records.thisMonth_Jan ? records.thisMonth_Jan.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Feb ? records.thisMonth_Feb.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Mar ? records.thisMonth_Mar.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Apr ? records.thisMonth_Apr.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_May ? records.thisMonth_May.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jun ? records.thisMonth_Jun.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jul ? records.thisMonth_Jul.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Aug ? records.thisMonth_Aug.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Sep ? records.thisMonth_Sep.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Oct ? records.thisMonth_Oct.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Nov ? records.thisMonth_Nov.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Dec ? records.thisMonth_Dec.totalAmount : 0.00}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计重量</span>
					<span class="info_one">{{records.thisMonth_Jan ? records.thisMonth_Jan.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Feb ? records.thisMonth_Feb.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Mar ? records.thisMonth_Mar.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Apr ? records.thisMonth_Apr.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_May ? records.thisMonth_May.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jun ? records.thisMonth_Jun.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jul ? records.thisMonth_Jul.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Aug ? records.thisMonth_Aug.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Sep ? records.thisMonth_Sep.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Oct ? records.thisMonth_Oct.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Nov ? records.thisMonth_Nov.weight : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Dec ? records.thisMonth_Dec.weight : 0.00}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计体积</span>
					<span class="info_one">{{records.thisMonth_Jan ? records.thisMonth_Jan.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Feb ? records.thisMonth_Feb.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Mar ? records.thisMonth_Mar.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Apr ? records.thisMonth_Apr.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_May ? records.thisMonth_May.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jun ? records.thisMonth_Jun.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Jul ? records.thisMonth_Jul.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Aug ? records.thisMonth_Aug.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Sep ? records.thisMonth_Sep.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Oct ? records.thisMonth_Oct.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Nov ? records.thisMonth_Nov.volume : 0.00}}</span>
					<span class="info_one">{{records.thisMonth_Dec ? records.thisMonth_Dec.volume : 0.00}}</span>
				</div>
            </div>
		
			<div class="detial">
                <div class="title">上年发货信息</div>
                <div class="total_info" style="text-align: left;">
                    <span class="info_one" style="padding-left: 6px;">全年合计</span>
                    <span class="info_one" style="padding-left: 6px;">发货次数 {{records.lastYear_Count}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计运费 {{records.lastYear_Amount}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计重量 {{records.lastYear_Weight}}</span>
                    <span class="info_one" style="padding-left: 6px;">合计体积 {{records.lastYear_Volume}}</span>
                </div>
				<div class="total_info">
					<span class="info_one">月份</span>
					<span class="info_one">一月</span>
					<span class="info_one">二月</span>
					<span class="info_one">三月</span>
					<span class="info_one">四月</span>
					<span class="info_one">五月</span>
					<span class="info_one">六月</span>
					<span class="info_one">七月</span>
					<span class="info_one">八月</span>
					<span class="info_one">九月</span>
					<span class="info_one">十月</span>
					<span class="info_one">十一月</span>
					<span class="info_one">十二月</span>
				</div>
				<div class="total_info">
					<span class="info_one">发货次数</span>
					<span class="info_one">{{records.lastMonth_Jan ? records.lastMonth_Jan.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Feb ? records.lastMonth_Feb.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Mar ? records.lastMonth_Mar.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Apr ? records.lastMonth_Apr.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_May ? records.lastMonth_May.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Jun ? records.lastMonth_Jun.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Jul ? records.lastMonth_Jul.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Aug ? records.lastMonth_Aug.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Sep ? records.lastMonth_Sep.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Oct ? records.lastMonth_Oct.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Nov ? records.lastMonth_Nov.count : 0}}</span>
					<span class="info_one">{{records.lastMonth_Dec ? records.lastMonth_Dec.count : 0}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计运费</span>
					<span class="info_one">{{records.lastMonth_Jan ? records.lastMonth_Jan.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Feb ? records.lastMonth_Feb.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Mar ? records.lastMonth_Mar.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Apr ? records.lastMonth_Apr.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_May ? records.lastMonth_May.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jun ? records.lastMonth_Jun.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jul ? records.lastMonth_Jul.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Aug ? records.lastMonth_Aug.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Sep ? records.lastMonth_Sep.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Oct ? records.lastMonth_Oct.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Nov ? records.lastMonth_Nov.totalAmount : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Dec ? records.lastMonth_Dec.totalAmount : 0.00}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计重量</span>
					<span class="info_one">{{records.lastMonth_Jan ? records.lastMonth_Jan.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Feb ? records.lastMonth_Feb.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Mar ? records.lastMonth_Mar.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Apr ? records.lastMonth_Apr.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_May ? records.lastMonth_May.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jun ? records.lastMonth_Jun.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jul ? records.lastMonth_Jul.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Aug ? records.lastMonth_Aug.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Sep ? records.lastMonth_Sep.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Oct ? records.lastMonth_Oct.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Nov ? records.lastMonth_Nov.weight : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Dec ? records.lastMonth_Dec.weight : 0.00}}</span>
				</div>
				<div class="total_info">
					<span class="info_one">合计体积</span>
					<span class="info_one">{{records.lastMonth_Jan ? records.lastMonth_Jan.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Feb ? records.lastMonth_Feb.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Mar ? records.lastMonth_Mar.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Apr ? records.lastMonth_Apr.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_May ? records.lastMonth_May.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jun ? records.lastMonth_Jun.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Jul ? records.lastMonth_Jul.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Aug ? records.lastMonth_Aug.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Sep ? records.lastMonth_Sep.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Oct ? records.lastMonth_Oct.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Nov ? records.lastMonth_Nov.volume : 0.00}}</span>
					<span class="info_one">{{records.lastMonth_Dec ? records.lastMonth_Dec.volume : 0.00}}</span>
				</div>
            </div>
			
		</a-modal>

	</div>
</template>

<script>

const columns = [
	{
        title: '客户代号',
        key: 'codeno',
		dataIndex: 'codeNo',
		width: 100
	},
	{
        title: '收件单位/个人',
        key: 'name',
		dataIndex: 'name',
		width: 300,
		ellipsis: true
	},
	{
        title: '联系人',
        key: 'linkman',
		dataIndex: 'linkMan',
		width: 150
	},
	{
        title: '联系电话',
        key: 'telphone',
		dataIndex: 'telPhone',
		width: 200
	},
	{
        title: '目的地',
        key: 'destination',
		dataIndex: 'destination',
		width: 150
	},
	{
        title: '结算方式',
        key: 'payway',
		dataIndex: 'payWay',
		width: 100
	},
	{
        title: '全年发货票数',
        key: 'yearsummarycount',
		dataIndex: 'yearSummary_Count',
		width: 120
	},
	{
        title: '本月发货次数',
        key: 'monthsummarycount',
		dataIndex: 'monthSummary_Count',
		width: 120
	},
	{
        title: '全年发货金额',
        key: 'yearsummaryamount',
		dataIndex: 'yearSummary_Amount',
		width: 120
	},
	{
        title: '本月发货金额',
        key: 'monthsummaryamount',
		dataIndex: 'monthSummary_Amount',
		width: 120
	},
	{
        title: '操作',
        key: 'action',
		scopedSlots: { customRender: 'action' },
		width: 60
}];

export default {
	name: 'Customerlist',
	data() {
		return {
			infodata: [],
			columns,
			cusInfo: '',
			destination: '',
			loadingMore: true,
			imgsrc: '',
			visible: false,
			customer: {},
			records: {}
		}
	},
	methods: {
		getCusInfo(e) {
			this.cusInfo = e.target.value;
		},
		getDestination(e) {
			this.destination = e.target.value;
		},
		getCUQC() {
			this.$axios.put('/api/CU/QC', {
				CusInfo: this.cusInfo,
				Destination: this.destination
			}).then((res) => {
				if (res.code === 200) {
					this.infodata = res.data;
					this.loadingMore = false
				}
			})
		},
		getCUCD(text) {
			this.$message.info('加载中...', 1);

			this.customer = text;

			this.$axios.get(`/api/CU/CD/${text.id}`, {}).then((res) => {
				if (res.code === 200) {
					this.records = res.data;
					this.visible = true;
				}
			})
		},

		closeModal() {
			this.visible = false;
		}
	},
	created() {
		this.getCUQC();
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
    
    .item_one {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid #eee;
        .item_left {
            margin-right: 120px;
        }
        .item_label {
            display: inline-block;
            width: 80px;
        }
	}
	
	.detial {
		margin-top: 24px;
		border: 1px solid #333333;
		text-align: center;
		.title {
			padding: 6px 0;
			border-bottom: 1px solid #333333;
		}
		.total_info {
			width: 100%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #333333;
			.info_one {
				box-sizing: border-box;
				padding: 6px 0;
				flex: 1;
				border-right: 1px solid #333333;
			}
			.info_one:last-child {
				border-right: none;
			}
		}
		.total_info:last-child {
			border-bottom: none;
		}
	}
</style>
