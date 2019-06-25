<template>
    <div class="btc-index">
       <div class="bg">
           <div class="header">
               <img class="title" src="../assets/img/title.png" alt="">
               <div class="decs">
                   <flexbox>
                       <flexbox-item>
                           <div class="wrap">
                               <span>抢活跃排位</span>
                               <span>再赢金蛋得积分</span>
                              <button class="btn" @click="toRouterActiveRule">活动规则 <img class="btn-img" src="../assets/img/rightbtn.png" alt=""></button>
                           </div>
                       </flexbox-item>
                   </flexbox>
               </div>
               <div class="prize-pool">
                   <flexbox>
                       <flexbox-item>
                           <div class="wrap">
                               <span class="comment">当前奖池</span>
                                <span class="count" v-for="num in poolCount">
                                   <span>{{num}}</span>
                                </span>
                               <span class="comment">积分</span>
                           </div>
                       </flexbox-item>
                   </flexbox>
               </div>
           </div>
           <div class="dialogue" ref="dialogue">
               <div class="dialogue-wrap" v-for="(usr,index) in dialogueList">
                   <img class="img" src="../assets/img/gold.png">
                   <span class="word">{{usr.words}}</span>
               </div>
           </div>
           <div class="operation">
               <div class="operation-page">
                   <button @click="toRouter('dialog')" class="btn operation-btn"><img src="../assets/img/comment.png" width="47px" alt=""></button>
                   <div class="operation-text" v-show="!status">
                       <div>你还未预言哦</div>
                       <div>截止下一个交易日13:00</div>
                   </div>
                   <button @click="toRouter('price')" class="btn operation-btn"><img src="../assets/img/gift.png" width="47px" alt=""></button>
               </div>
               <div class="user-operation">
                   <div class="date">
                       <span class="sp1">6月20日BTC指数</span>
                       <span class="sp2">2987.12 +23%</span>
                   </div>
                   <div class="rate">
                       <div class="bar" style="width: 59%">
                           <img width="100%" height="100%" src="../assets/img/redbar.png" alt="" >
                       </div>
                       <div class="bar" style="width: 41%">
                           <img width="100%" height="100%" src="../assets/img/greenbar.png" alt="">
                       </div>
                   </div>
                   <div class="guess-btn" v-show="!status">
                       <button @click="lookUp" class="btn guess-sub-btn"><img width="100%" src="../assets/img/redbtn.png" alt=""></button>
                       <button @click="lookDown" class="btn"><img width="100%" src="../assets/img/greenbtn.png" alt=""></button>
                   </div>
                   <div class="guessed-text" v-show="status">
                       <p>您已预言<span style="color:#C34E4C">涨</span><span style="color:#36884A">跌</span></p>
                       <p class="p1">预计下一个交易日15:15结果揭晓</p>
                   </div>
               </div>
               <div>每个交易日涨跌仅可预言一次,每次可投20-200ultrain积分</div>
           </div>
       </div>
       <div class="record">
           <div class="record-info">
               <div class="prophecy" @click="toRouter('prophecy')">
                   <span>预言记录</span>
                   <img src="../assets/img/arrowR.png" width="5px" height="10px" alt="">
               </div>
               <div class="info">
                    <div><p class="rank">999+</p><p class="desc">活跃度排行</p></div>
                    <div><p class="rank">999+</p><p class="desc">胜率排行</p></div>
                    <div><p class="rank">100%</p><p class="desc">胜率</p></div>
                    <div><p class="rank">3次</p><p class="desc">预言战绩</p></div>
               </div>
           </div>
           <div class="record-tab">
               <button-tab v-model="tabIndex">
                   <button-tab-item @on-item-click="handleTab">活跃度排行</button-tab-item>
                   <button-tab-item @on-item-click="handleTab">胜率排行</button-tab-item>
               </button-tab>
               <div class="record-desc"><span v-show="tabIndex==0">活跃度排名靠前的人，更有机会瓜分金蛋积分</span></div>
               <swiper v-model="tabIndex" height="355px" :show-dots="false">
                   <swiper-item v-for="(item, index) in tablist" :key="index">
                       <div class="list-block" v-for="(itm,index) in tableData[item]" :key="index">
                           <span class="sp1">{{itm.rank}}</span>
                           <img width="32px" height="32px" src="../assets/img/comment.png" alt="">
                           <span class="sp2">{{itm.name}}</span>
                           <span class="sp3">{{itm.decs}}<span class="sp4" v-if="tabIndex==0">活跃度</span></span>
                       </div>
                   </swiper-item>
               </swiper>
               <button class="btn list-block list-block-btn" @click="handleToMore(tabIndex)"><span>查看更多</span></button>
           </div>
       </div>
        <div v-transfer-dom>
            <x-dialog v-model="showDialog" hide-on-blur :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
                <div class="dialog-wrap" style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
                    <div style="text-align: right;margin-right: -4px">
                        <x-icon @click="showDialog = false" type="ios-close-empty" size="24" style="fill:#7A8496;"></x-icon>
                    </div>
                    <p style="font-size: 18px;font-weight: 700;color:#FFD600;">预言{{date}}大盘指数涨跌</p>
                    <p style="display: flex;justify-content: space-between;margin:30px 0 15px;"><span style="color: #78BAEC">请选择预言积分数</span><span style="color: #fff">我的积分:22222</span></p>
                    <div style="display: flex;justify-content: space-between">
                        <button style="width: 54px;height:34px;border:0;background-color: #0A2A5B;border-radius: 3px;color:#fff;font-size: 21px;font-weight: bold" v-for="item in selectCount">{{item}}</button>
                    </div>
                    <button v-if="statusUpDown=='up'" style="margin-top: 33px;padding:0;"><img width="100%" src="../assets/img/sureRedbtn.png" alt=""></button>
                    <button v-if="statusUpDown!=='up'" style="margin-top: 33px;padding:0;"><img width="100%" src="../assets/img/sureGreenbtn.png" alt=""></button>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showDialogGlodEgg" hide-on-blur :dialog-style="{'max-width': '100%',width:'289px', height: '320px',backgroundColor:'transparent'}">
                <div style="width:100%;height:100%;">
                    <div style="width:100%;height159px;position: absolute;top:0;left:0;z-index: 1">
                        <img src="../assets/img/eggBg.png" width="100%" alt="">
                        <img style="position: absolute;top:127px;left:42px;" src="../assets/img/eggText.png" width="205px" height="24px" alt="">
                    </div>
                    <div style="width: 100%;height: 270px;position:absolute;top:50px;left:0;border-radius: 22px;background-color: #001436;padding:0 29px;">
                        <p style="font-size: 18px;color: #FFD600;margin-top: 120px">获得100积分</p>
                        <button @click="sureClose" style="background: none;border:0;padding:0;margin-top:32px;"><img width="100%" src="../assets/img/sure.png" alt=""></button>
                    </div>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import { Flexbox, FlexboxItem,Group,Cell,ButtonTab, ButtonTabItem,Swiper, SwiperItem,XDialog, TransferDomDirective as TransferDom } from 'vux'
import '../assets/scss/indexStyle.scss'
export default {
    directives: {
        TransferDom
    },
    components:{
        Flexbox,
        FlexboxItem,
        Group,
        Cell,
        ButtonTab, ButtonTabItem,
        Swiper, SwiperItem,
        XDialog,
    },
    data(){
        return {
            date:'6月19日',
            status:false,
            statusUpDown:'up',
            showDialog:false,
            showDialogGlodEgg:false,
            intervalId: null,
            tabIndex:0,
            tablist:['活跃度排行','胜率排行'],
            tableData:{
                '活跃度排行':[{name:'小美人',avatar:'',rank:'1',decs:'3233'},
                    {name:'小美人',avatar:'',rank:'1',decs:'3232'},
                    {name:'小美人',avatar:'',rank:'1',decs:'3232'},
                    {name:'小美人',avatar:'',rank:'1',decs:'3232'},
                    {name:'小美人',avatar:'',rank:'1',decs:'3232'},
                    {name:'小美人',avatar:'',rank:'1',decs:'3232'}],
                '胜率排行':[{name:'胜率',avatar:'',rank:'1',decs:'100%'},
                    {name:'胜率daren',avatar:'',rank:'1',decs:'100%'},
                    {name:'lallafdfs',avatar:'',rank:'1',decs:'100%'}]},
            poolCount:[1,2,3,4,2,3],
            selectCount:[20,50,100,200],
            dialogueList:[
                {avatar:'../assets/img/gold.png',words:'aaaaaa'},
                {avatar:'../assets/img/gold.png',words:'hhhhhhhhh'},
                {avatar:'../assets/img/gold.png',words:'莫名其妙'},
                {avatar:'../assets/img/gold.png',words:'涨啊'},
                {avatar:'../assets/img/gold.png',words:'一定跌'},
                {avatar:'../assets/img/gold.png',words:'开聊'},
                {avatar:'../assets/img/gold.png',words:'你怎么看待，明天肯定'},
                {avatar:'../assets/img/gold.png',words:'大家好'},
                {avatar:'../assets/img/gold.png',words:'是大风大风大风大风大风大风大风大风大是大非上'},
                {avatar:'../assets/img/gold.png',words:'放松放松放松放松放松对方的身份是大风大风当时发生的发生的放松放松的方式发呆'},
            ],
        }
    },
    methods:{
        handleTab(val){console.log(val)},
        handleToMore(index){
        },
        animationPlay:function () {
          let ele = this.$refs.dialogue
        },
        lookUp(){
            this.showDialog=true
            this.statusUpDown='up'
        },
        lookDown(){
            this.showDialog=true
            this.statusUpDown='down'
        },
        sureClose(){
            this.showDialogGlodEgg=false
        },
        toRouter(name){
            let index = name=='prophecy'?0:1
            name=='prophecy'||name=='price'?this.$router.push({name:'Mine',params:{index:index}}):this.$router.push('MessageBoard')
        },
        toRouterActiveRule(){
            this.$router.push('ActiveRule')
        },
    },
    mounted() {
        this.animationPlay()
       /* this.intervalId = setInterval(() => {
            this.animationPlay()
        }, 2000)*/
    },
    beforeDestroy () {
        clearInterval(this.intervalId)
    }
}
</script>
