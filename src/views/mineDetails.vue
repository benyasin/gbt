<template>
    <div class="mine-details">
        <div class="header-router">
            <x-icon class="icon" @click="goback" type="ios-arrow-thin-left" size="30"></x-icon>
            <span class="title">记录详情</span>
        </div>
        <div class="mine-details-content">
            <div class="prophecy-block">
                <p class="item"><span class="title">预言记录</span></p>
                <p class="item">
                    <span>预言方向</span>
                    <span>
                        <span>看</span>
                    <span :class="itmData.deraction=='up'?'redColor':'greenColor'">{{itmData.deraction=='up'?'涨':'跌'}}</span>
                    </span>
                </p>
                <p class="item">
                    <span>预言积分</span>
                    <span>{{itmData.count}}积分</span>
                </p>
                <p class="item">
                    <span>预言时间</span>
                    <span>{{itmData.date}}</span>
                </p>
            </div>
            <div class="result-block">
                <p class="item">
                    <span class="title">预言记录</span>
                    <span class="title">{{itmData.result | filterResult}}</span>
                </p>
                <p class="item">
                    <span>交易日</span>
                    <span>{{itmData.date}}</span>
                </p>
                <p class="item" v-if="itmData.result!=0">
                    <span>BTC方向</span>
                    <span>
                        <span>收</span>
                        <span :class="itmData.resultDeraction==1?'redColor':'greenColor'">{{itmData.resultDeraction=='1'?'涨':'跌'}}</span>
                    </span>
                </p>
                <p class="item" v-if="itmData.result!=0">
                    <span>预言奖励</span>
                    <span>{{itmData.price}}积分</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mineDetails",
        data(){
            return{
                itmData:{}
            }
        },
        created() {
            this.itmData=this.$route.params

        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
        },
        filters:{
            filterResult(val){
                console.log(val)
                if(val==='0'){
                    return '待公布'
                }else if(val==='1'){
                    return '预言成功'
                }else{
                    return '预言失败'
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme";
    .mine-details{
        width: 100%;
        height: 100%;
        background-color:$cBg ;
        position: relative;
        .mine-details-content{
            position: absolute;
            top:50px;
            left:0;
            bottom: 0;
            right: 0;
            border-top-right-radius: 22px;
            border-top-left-radius: 22px;
            background-color: #F5F5F5;
            padding:22px 15px 0;
            box-sizing: border-box;
            .redColor{
                color:$cRed;
            }
            .greenColor{
                color:$cGreen;
            }
            .title{
                font-size: 13px;
                color:#000;
            }
            .prophecy-block{
                @extend .block;
                height: 181px;
            }
            .result-block{
                @extend .block;
                min-height: 103px;
                margin-top: 15px;
            }
        }
    }
</style>
