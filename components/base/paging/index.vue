<template>
  <div :class="[pageClass]">
    <ul>
      <!-- <li class="disabled vPaginationList" v-if="config.pageSizeMenu">
                <a>{{i18n.pageLength}}
                    <select @change="switchLength" v-model="pageSize">
                        <option v-for="(len,key) in lengthList">{{len}}</option>
                    </select>
                </a>
            </li> -->
      <li 
        v-if="config.info" 
        class="disabled bPageInfo">
        <a>{{
          i18n.pageInfo
            .replace('#pageNumber#', currentPage)
            .replace('#totalPage#', totalPage)
            .replace('#totalRow#', totalRow)
        }}</a>
      </li>
      <li :class="{disabled:currentPage === 1,bPageControlButton:true} ">
        <a 
          :style="{color:(backColor=='dark')?'#fff ':'#000 '}" 
          href="javascript:void(0);" 
          @click="switchPage('first')">{{ i18n.first }}</a>
      </li>
      <li :class="{disabled:currentPage === 1,bPageControlButton:true}">
        <a 
          :style="{color:(backColor=='dark')?'#fff ':'#000 '}" 
          href="javascript:void(0);" 
          @click="switchPage('previous')">{{ i18n.previous }}</a>
      </li>
      <li 
        v-for="(num,key) in pageNumbers" 
        :key="key"
        :class="{active:(num === currentPage)}" 
        class="pageindex">
        <a 
          :style="{color:(backColor=='dark')?'#fff ':'#000 '}" 
          href="javascript:void(0);" 
          @click="switchPage(num)">{{ num }}</a>
      </li>
      <li :class="{bPageControlButton:true,disabled:currentPage === totalPage}">
        <a 
          :style="{color:(backColor=='dark')?'#fff ':'#000 '}" 
          href="javascript:void(0);" 
          @click="switchPage('next')">{{ i18n.next }}</a>
      </li>
      <li :class="{bPageControlButton:true,disabled:currentPage === totalPage}">
        <a 
          :style="{color:(backColor=='dark')?'#fff ':'#000 '}" 
          href="javascript:void(0);" 
          @click="switchPage('last')">{{ i18n.last }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
    import con from './constants';
    let {languages, defaults} = con;

    export default {
        name: "Vpage",
        props: {
            setting:{
                type:Object,
                default:() => { return {} }
            }
        },
        data(){
            let config = this.setting;
            let i18n = languages[config.language];

            return {
                config: config,
                pageNumber: 1,
                pageSize: config.pageSizeMenu&&Array.isArray(config.pageSizeMenu)&&config.pageSizeMenu.length?config.pageSizeMenu[0]:10,
                totalRow: config.totalRow,
                totalPage: config.totalPage,
                currentPage: 1,
                lengthList: config.pageSizeMenu,
                pageNumberSize: 10,
                language: config.language,
                i18n: i18n,
                pageClass : {
                    vPagination: true,
                    vPaginationRight: false,
                    vPaginationCenter: false
                },
                backColor:config.backColor,
            };
        },
        computed:{
            totalPageCompute(){
                return this.totalPage;
            },
            pageNumbers: function(){
                let start, end, nums = [], pNum = this.currentPage, half = Math.floor(this.pageNumberSize / 2);
                if(this.totalPageCompute < this.pageNumberSize) {
                    start = 1;
                    end = this.totalPageCompute;
                } else if ( pNum <= half ) {
                    start = 1;
                    end = this.pageNumberSize;
                } else if ( pNum >= (this.totalPageCompute - half) ) {
                    start = this.totalPageCompute - this.pageNumberSize + 1;
                    end = this.totalPageCompute;
                } else {
                    start = pNum - half;
                    end = start + this.pageNumberSize - 1;
                }

                for(let i = start;i <= end; i++){
                    nums.push(i);
                }
                return nums;
            }
        },
        watch:{
            currentPage:function(val){
                this.goPage(val);
            },
            'setting.totalPage':function(val){
                this.totalPage = val;
                //this.calcTotalPage();
            }
        },
        mounted(){
            if(this.config.align === 'center')
                this.pageClass.vPaginationCenter = true;
            else if(this.config.align === 'right')
                this.pageClass.vPaginationRight = true;
            this.goPage(1);
        },
        methods:{
            goPage(pNum){
                this.currentPage = pNum;
                this.$emit('page-change',{
                    pageNumber: pNum,
                    pageSize: Number(this.pageSize)
                });
                //this.calcTotalPage();
            },
            calcTotalPage(){
                this.totalPage = Math.ceil(this.totalRow / this.pageSize);
            },
            switchPage(pNum){
                if(typeof(pNum) === 'string'){
                    switch (pNum){
                        case 'first':
                            if(this.currentPage!==1) this.currentPage = 1;
                            break;
                        case 'previous':
                            if(this.currentPage!==1) this.currentPage--;
                            break;
                        case 'next':
                            if(this.currentPage!==this.totalPageCompute) this.currentPage++;
                            break;
                        case 'last':
                            if(this.currentPage!==this.totalPageCompute) this.currentPage = this.totalPageCompute;
                            break;
                    }
                }else if(typeof(pNum) === 'number'){
                    this.currentPage = pNum;
                }
            },
            switchLength(){
                this.goPage(1);
            }
        },
    }
</script>

<style lang="less" scoped>
    @borderRadius: 2px;
    div.vPagination{
        margin: 0;display: block;
        &.vPaginationRight{ text-align: right; }
        &.vPaginationCenter{ text-align: center; }
        & > ul {
            display: inline-block;
            margin-bottom: 0;
            margin-left: 0;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
            // -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            // -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            // box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            padding: 0;
            & > li.pageindex.active{
                    & > a {
                        &:hover{
                            color:#fff !important;
                        }
                    }
            }
            & > li {
                text-align: center;display: inline;box-sizing: border-box;margin: 0;
                & > a {
                    margin: 0;
                    //border: 1px solid #dddddd;
                    border-radius: 0;
                    //padding: 6px 12px;
                    padding: 5px 9px 1px;
                    line-height: 20px;
                    box-shadow: none;
                    -moz-box-shadow: none;
                    -webkit-box-shadow: none;
                    //background-color: white;

                    float: left;
                    text-decoration: none;

                    border-left-width: 0;
                    box-sizing: content-box;
                    color: black;
                    -webkit-transition: all .5s cubic-bezier(.175,.885,.32,1);
                    transition: all .5s cubic-bezier(.175,.885,.32,1);
                    &:hover {
                        // box-shadow: 0 0 12px rgba(0,0,0,0.2);
                        // -moz-box-shadow: 0 0 12px rgba(0,0,0,0.2);
                        // -webkit-box-shadow: 0 0 12px rgba(0,0,0,0.2);
                         color: #3C8C63 !important;
                         box-shadow: none;
                    }
                }
                &.disabled > a {
                    color: #999999;cursor: default;
                    &:hover {
                        color: #3C8C63;box-shadow: none;
                    }
                }
                &.active > a,
                &.active > span {
                    cursor: default;color: #999999;
                    //background-color: #EEEEEE;
                    background-color: #3C8C63;
                    border-radius: 50%;
                    &:hover { box-shadow: none; }
                }
                &:first-child > a,
                &:first-child > span {
                    border-left-width: 1px;
                    -webkit-border-bottom-left-radius: @borderRadius;
                    border-bottom-left-radius: @borderRadius;
                    -webkit-border-top-left-radius: @borderRadius;
                    border-top-left-radius: @borderRadius;
                    -moz-border-radius-bottomleft: @borderRadius;
                    -moz-border-radius-topleft: @borderRadius;
                }
                &:last-child > a,
                &:last-child > span {
                    -webkit-border-bottom-right-radius: @borderRadius;
                    border-bottom-right-radius: @borderRadius;
                    -webkit-border-top-right-radius: @borderRadius;
                    border-top-right-radius: @borderRadius;
                    -moz-border-radius-bottomright: @borderRadius;
                    -moz-border-radius-topright: @borderRadius;
                }
                &.vPaginationList {
                    a { line-height: 20px;height: 20px; }
                    select{
                        margin: -2px 0 0 5px;
                        width: auto !important;
                        vertical-align: middle;
                        height: 22px;
                        line-height: 22px;
                        font-size: 12px;
                        padding: 0;
                        display: inline-block;
                        border: 1px solid #CCCCCC;
                        &:hover{
                            box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -moz-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                            -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.2);
                        }
                    }
                }
            }
            
        }
    }
</style>