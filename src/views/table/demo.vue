<template>

    <basic-container>
      <sj-table :options="table1" ref="tableDemo"></sj-table>
    </basic-container>

</template>

<script>
    import {mapGetters} from 'vuex';
    import FileApi from '@/api/file/FileApi';
    import SjTable from "@/components/sj-table/sj-table";
    export default {
        name: 'case',
        components: {SjTable},
        data() {
            return {
                table1: {

                    options: {width: 100},
                    refresh: this.findPage,

                    selection: true,

                    columns: [{
                        prop: 'fileName',
                        label: '文件名称',

                    }, {
                        prop: 'fileSuffix',
                        label: '文件类型',

                    }, {
                        prop: 'createTime',
                        label: '创建时间',
                        render:function(row){
                            var html = '<div><i class="el-icon-time"></i>';
                            html += '<span style="margin-left: 10px">{{row.createTime}}</span></div>';
                            return html;
                        }
                    }, {
                        prop: '_option',
                        label: '操作',
                        operation: [{
                            label: '编辑',
                            type: 'primary',
                            icon: 'el-icon-edit',
                            show: function (row) {
                                return true;
                            },
                            func: this.handleEdit
                        },{
                            label: '删除',
                            type: 'danger',
                            show: function (row) {
                                return true;
                            },
                            func: this.handleDelete
                        }]
                    }],
                    operateBtns: [{
                        label: '新增',
                        type: 'primary',
                        icon: 'el-icon-plus',
                        func: this.handleAdd,
                        show: function () {
                            return true;
                        }
                    }, {
                        label: '删除',
                        type: 'primary',
                        func: this.handleSelectionDel,
                        show: function () {
                            return true;
                        }
                    }, {
                        label: '导入',
                        type: 'primary',
                        func: this.handleImport,
                        show: function () {
                            return true;
                        }
                    }, {
                        label: '导出',
                        type: 'primary',
                        func: this.handleExport,
                        show: function () {
                            return true;
                        }
                    }],
                    filters: [{
                      prop: 'fileName',
                      label: '文件名称',
                      type: 'input'
                    }, {
                      prop: 'fileSuffix',
                      label: '文件类型',
                      type: 'select',
                      options: this.getDict('FILE_TYPE')
                    }],
                    pagination:{
                        layout: "total, sizes, prev, pager, next, jumper"
                    }
                },
                tableSelectRow: []
            };
        },

        watch: {},
        mounted() {
        },
        computed: {
            ...mapGetters(['permission', 'menuAll']),
        },
        props: [],
        methods: {
            //获取列表
            findPage: function(param) {

                let fileApi = new FileApi();
                return fileApi.page(param);

            },
            //行内编辑
            handleEdit(row) {
                console.info(row);
            },
            //行内删除
            handleDelete(row) {
                console.info(row);
            },
            //获取字典
            getDict(dictType) {
                console.info(dictType);
                return [{
                    label: 'PNG',
                    value: 'png'
                },{
                    label: 'WORD',
                    value: 'word'
                }]
            },
            // // 多行选择
            // handleSelectionChange(val) {
            //     this.tableSelectRow = val
            //     // console.log(val)
            // },
            // 新增
            handleAdd() {
                console.log('add')
            },
            // 多行删除
            handleSelectionDel() {
              console.log(this.$refs.tableDemo.tableSelect);
            },
            // 导入
            handleImport() {
                console.log('import')
            },
            // 导出
            handleExport() {
                console.log('export')
            },
        },
    };
</script>

<style lang="scss">
  .table-container {
    padding: 8px 10px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
