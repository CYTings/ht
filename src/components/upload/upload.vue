<template>
    <div>
        <a-upload :multiple='true'
                :headers="headers"
                name="file"
                @change="uploadFiles"
                action='http://www.weecode.cn:8888/api/Files/UploadFiles'>
            <a-button>
                <a-icon type="upload" /> 上传文件
            </a-button>
        </a-upload>
    </div>
</template>

<script>
export default {
    name: 'upload',
    props: {
        types: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            headers: {
				authorization: `Bearer ${localStorage.getItem('token')}`
			}
        }
    },
    methods: {
        uploadFiles(info) {
            let status = info.file.status;
            let arr = [];
            info.fileList.forEach((i, n) => {
                if(i.status === "done") {
                    arr.push({
                        src: i.response.data
                    })
                }
            })
            let obj = {
                type: this.types,
                arr
            }
            this.$emit('sendlist', obj);
        }
    }
}
</script>