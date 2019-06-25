<template>
    <div class="gbt-dialog">
        <div class="gbt-dialog-header">
            <x-icon class="icon" @click="goback" type="ios-arrow-thin-left" size="30"></x-icon>
            <span class="title">发弹幕</span>
            <button class="btn send-btn">发送</button>
        </div>
        <x-textarea v-model="usrMessage" :max="20" placeholder="写下你的想法" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </div>
</template>

<script>
    import {XTextarea} from 'vux'
    export default {
        components:{
            XTextarea,
        },
        name: "MessageBoard",
        data(){
            return{
                usrMessage:'',
            }
        },
        methods:{
            goback () {
                this.$router.go(-1)
            },
            onEvent (event) {
                console.log('on', event)
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme";
    .gbt-dialog{
        width: 100%;
        height: 100%;
        background: $cWhite;
        .gbt-dialog-header{
            height: 50px;
            padding:0 14px;
            @include flex-row(row,space-between);
            align-items: center;
            .icon{
                fill: $cBg;
            }
            .title{
                color:$cBg;
            }
            .send-btn{
                @include setBtn(70px,30px,$cGreen,5px,$cWhite,12px);
            }
        }

    }
</style>
