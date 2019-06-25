<template>
    <div class="active-rule">
        <div class="header-router">
            <x-icon class="icon" @click="goback" type="ios-arrow-thin-left" size="30"></x-icon>
            <span class="title">关于活动</span>
        </div>
        <div class="active-rule-contet">
            <p class="active-rule-contet-item">
                <span class="title">一、参与资格</span>
                <span class="decs">活动仅限ultrain用户参加。</span>
            </p>
            <p class="active-rule-contet-item">
                <span class="title">二、活动时间</span>
                <span class="decs">几点到几点。</span>
            </p>
            <p class="active-rule-contet-item">
                <span class="title">三、活动规则</span>
                <span class="decs">1. 参与规则：活动期间，T日BTC涨跌的预言时间为T-1日15:15至T日13:00，T日15:15后至T+1日13:00前预言T+1日BTC涨跌，以此类推（T为交易日，周末及国家法定节假日不开盘）。用户可在【ultrainApp】-【Dapp】-【GBT】使用ultrain积分参加对交易日的上证指数涨跌的预言。每次预言最低使用20ultrain积分，最高使用1000ultrain积分，每次预言额外收取5ultrain积分加入奖励池中，活跃度排名越高，得到奖励持中金蛋的概率越大。每天做出预言后不可修改，积分使用后无法退还。</span>
                <span class="decs">2. 开奖规则：在当前交易日收盘后的15:15左右，预言结果揭晓。若预言成功，则按参与积分在所预言方的积分池的比例，瓜分当日所有预言积分，若预言失败，则无积分。所获积分一般在当日预言结果揭晓后24小时内到账。单日单一用户可获得最高ultrain积分不超过5000分。</span>
                <span class="decs">3. 战绩排行规则：排行榜在每个交易日预言结果揭晓时更新。参与活动后个人战绩若进入前50名将在排行榜中展现。战绩排行榜按照用户活跃度和胜率排名，活跃度越高越靠前胜率越高越靠前；当活跃度或者胜率相同时，按照赢取的ultrain积分多少进行排名，越多越靠前</span>
                <span class="decs">4. 特别须知</span>
                <span class="decs">1) 禁止利用竞猜活动进行赌博活动等违法违规行为；若在活动前后发现违法违规行为，不仅限于冒用欺诈、赌博、传播色情、冒用他人身份等用户，ultrain有权取消活动参与资格。</span>
                <span class="decs">2) 请避免违规刷积分的行为，如发现刷积分行为，ultrain有权取消活动参与资格。</span>
                <span class="decs">3) 大盘不涨不跌视为上涨。</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "activeRule",
        methods:{
            goback(){
                this.$router.go(-1)
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme";
    .active-rule{
        width: 100%;
        height: 100%;
        position: relative;
        background-color: $cBg;
        overflow: hidden;
        .active-rule-contet{
            position: absolute;
            top:50px;
            left:0;
            bottom: 0;
            right: 0;
            border-top-right-radius: 22px;
            border-top-left-radius: 22px;
            background-color: #F5F5F5;
            padding:22px 15px;
            box-sizing: border-box;
            overflow-y: auto;
            @include flex-row(column,flex-start);
            .active-rule-contet-item{
                margin-bottom: 20px;
                line-height: 19px;
                font-size: 13px;
                color:#000;
                @include flex-row(column,flex-start);
                .title{
                    font-weight: 700;
                }
                .decs{
                    margin:5px 0;
                    color:#000;
                }
            }
        }
    }
</style>
