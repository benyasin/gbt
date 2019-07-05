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
               <ul>
                   <li class="dialogue-wrap" v-for="(usr,index) in dialogueList">
                       <img class="img" :src="usr.avatar">
                       <span class="word">{{usr.content}}</span>
                   </li>
               </ul>
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
                       <span class="sp1">{{date}}BTC指数</span>
                       <span class="sp2">{{userOperation.price}} {{userOperation.ratio}}</span>
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
                       <button @click="lookUpDown('up')" class="btn guess-sub-btn"><img width="100%" src="../assets/img/redbtn.png" alt=""></button>
                       <button @click="lookUpDown('down')" class="btn"><img width="100%" src="../assets/img/greenbtn.png" alt=""></button>
                   </div>
                   <div class="guessed-text" v-show="status">
                       <p>您已预言<span v-if="userInfo.predictResult>0" style="color:#C34E4C">涨</span><span v-else style="color:#36884A">跌</span></p>
                       <p class="p1">预计下一个交易日15:15结果揭晓</p>
                   </div>
               </div>
               <div>每个交易日涨跌仅可预言一次,每次可投20-500ultrain积分</div>
           </div>
       </div>
       <div class="record">
           <div class="record-info">
               <div class="prophecy" @click="toRouter('prophecy')">
                   <span>预言记录</span>
                   <img src="../assets/img/arrowR.png" width="5px" height="10px" alt="">
               </div>
               <div class="info">
                    <div><p class="rank">{{userInfo.predictRank}}</p><p class="desc">活跃度排行</p></div>
                    <div><p class="rank">{{userInfo.winRank}}</p><p class="desc">胜率排行</p></div>
                    <div><p class="rank">{{userInfo.winRatio*100}}%</p><p class="desc">胜率</p></div>
                    <div><p class="rank">{{userInfo.predictTimes}}</p><p class="desc">预言战绩</p></div>
               </div>
           </div>
           <div class="record-tab">
               <button-tab v-model="tabIndex">
                   <button-tab-item>活跃度排行</button-tab-item>
                   <button-tab-item>胜率排行</button-tab-item>
               </button-tab>
               <div class="record-desc"><span v-if="tabIndex==0">活跃度排名靠前的人，更有机会瓜分金蛋积分</span><span v-else>太棒了！继续加油哦</span></div>
               <swiper v-model="tabIndex" height="355px" :show-dots="false">
                   <swiper-item style="min-height: 355px" v-for="(item, index) in tablist" :key="index">
                       <div class="list-block" v-for="(itm,index) in tableData[item]" :key="index">
                           <span class="sp1">{{itm.rank}}</span>
                           <img width="32px" height="32px" :src="itm.avatar" alt="">
                           <span class="sp2">{{itm.username}}</span>
                           <span class="sp3"><span v-if="tabIndex==0">{{itm.predictTimes}}</span><span v-else>{{(itm.winRatio*100).toFixed(2)}}%</span><span class="sp4" v-if="tabIndex==0">活跃度</span></span>
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
                    <p style="font-size: 18px;font-weight: 700;color:#FFD600;">预言{{nextDate}}大盘指数涨跌</p>
                    <p style="display: flex;justify-content: space-between;margin:30px 0 15px;"><span style="color: #78BAEC">每次预言扣除2积分手续费</span><span style="color: #fff">我的积分:22222222</span></p>
                    <div style="display: flex;justify-content: space-between">
                        <button :style="[{backgroundColor:selectCount.indexOf(item)>-1?'#FFD600':'#0A2A5B'},{color:selectCount.indexOf(item)>-1?'#001436':'#fff'}]" @click="handleSelectCount(item)" style="width: 54px;height:34px;border:0;background-color: #0A2A5B;border-radius: 3px;color:#fff;font-size: 21px;font-weight: bold" v-for="item in countlist">{{item}}</button>
                    </div>
                    <button @click="sureGuess('up')" v-if="statusUpDown=='up'" style="margin-top: 33px;padding:0;"><img width="100%" src="../assets/img/sureRedbtn.png" alt=""></button>
                    <button @click="sureGuess('down')" v-if="statusUpDown!=='up'" style="margin-top: 33px;padding:0;"><img width="100%" src="../assets/img/sureGreenbtn.png" alt=""></button>
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
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>

import {createU3} from "u3.js"
import store from '../store'
import config from "../../config/ultrain"
import { Flexbox, FlexboxItem,Group,Cell,ButtonTab, ButtonTabItem,Swiper, SwiperItem,XDialog, TransferDomDirective as TransferDom ,Toast} from 'vux'
import '../assets/scss/indexStyle.scss'
import {mapGetters} from 'vuex'
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
        XDialog,Toast
    },
    data(){
        return {
            status:false,
            statusUpDown:'up',
            showDialog:false,
            showDialogGlodEgg:false,
            intervalId: null,
            tabIndex:0,
            tablist:['活跃度排行','胜率排行'],
            tableData:{},
            poolCount:[1,2,3,4,2,3],
            countlist:[20,100,200,500],
            dialogueList:[],
            selectCount:[],
            showToast:false,
            errorMsg:'',
            userOperation:{
                price:'',
                ratio:'',
            },
        }
    },
    created(){
        this.getPersonInfo()
    },
    computed:{
        ...mapGetters([
            'userInfo',
        ]),
        date(){
            let now = new Date()
            let m = now.getMonth() + 1
            let d = now.getDay()
            return m + '月' + d + '日'
        },
        nextDate(){
            let now = new Date()
            let m = now.getMonth() + 1
            let d = now.getDay()+1
            return m + '月' + d + '日'
        }
    },
    methods:{
        getPrizepoll(){
            this.axios.get(this.GLOBAL.baseUrl+'/chat')
                .then((res)=>{
                    let {code,data} = res
                    if(code==200){

                    }
                })
                .catch(err=>console.log(err))
        },
        async getPersonInfo(){
            let perdictInfo = await this.getPersonUrl('/predict/personal')
            let rankInfo = await this.getPersonUrl('/rank/personal')
            if(perdictInfo==null){
                this.status = false
            }else{
                this.status = true
                let obj = {
                    avatar: rankInfo.avatar,
                    predictRank: rankInfo.predictRank,
                    predictTimes: rankInfo.predictTimes,
                    winRank: rankInfo.winRank,
                    winRatio: rankInfo.winRatio,
                    winTimes: rankInfo.winTimes,
                    date: perdictInfo.date,
                    isFinished: perdictInfo.isFinished,
                    predictResult: perdictInfo.predictResult,
                    predictValue: perdictInfo.predictValue,
                    userId: perdictInfo.userId,
                    username: perdictInfo.username,
                    _id: perdictInfo._id,
                }
                store.commit('SET_USERINFO', obj);
            }
        },
        getPersonUrl(url){
            const promise = new Promise((resolve,reject)=>{
                let userId = 'rku2pvlH7'
              this.axios.get(this.GLOBAL.baseUrl+url+`?userId=${userId}`)
                  .then((res)=>{
                      let {state,data}=res.data
                      state=='success'?resolve(data):resolve(null)
                  }).catch((err)=>{
                      reject(err)
              })
            })
            return promise
        },
        async getTableData(){
            let map = new Map()
            let obj={}
            let activelist = await this.getDataUrl('/rank/activeList')
            let winlist = await this.getDataUrl('/rank/winList')
            map.set('活跃度排行',activelist)
            map.set('胜率排行',winlist)
            for(let [key,value] of map){
                obj[key] = value
            }
            this.tableData = obj
        },
        getDataUrl(url){
            const promise = new Promise((resolve,reject)=>{
                this.axios.get(this.GLOBAL.baseUrl + url)
                    .then((res)=>{
                        let {state,data} = res.data
                        state=='success'?resolve(data):resolve([])
                    }).catch((err)=>{
                        reject(err)
                })
            })
            return promise
        },
        getChatList(){
            this.axios.get(this.GLOBAL.baseUrl+'/chat/list')
                .then((res)=>{
                    let {state,message,data} = res.data
                    if(state=='success'){
                        this.dialogueList = data
                    }else{
                        this.showToast= true
                        this.errorMsg = message
                    }
                })
                .catch((err)=>console.log(err))
        },
        getLatestIndex(){
            this.axios.get(this.GLOBAL.baseUrl+'/predict/latestIndex')
                .then((res)=>{
                    let {state,message,data} = res.data
                    if(state=='success'){
                        this.userOperation = data
                    }else{
                        this.showToast= true
                        this.errorMsg = message
                    }
                })
                .catch((err)=>console.log(err))
        },
        lookUpDown(val){
            this.selectCount= []
            this.showDialog=true
            this.statusUpDown=val
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
        handleToMore(index){
            this.$router.push({name:'More',params:{index:index}})
        },
        // 选择预言积分
        handleSelectCount(item){
            let arr = this.selectCount
            let target = arr.filter(function (a) {
                return a==item
            })
            if(target.length){
                let array=arr.filter(function (b) {
                    return b!=item
                })
                this.selectCount=array
            }else{
               arr.pop()
               arr.push(item)
               this.selectCount=arr
            }
        },
        // 提交预言
        sureGuess(val){
            let params = {
                phoneNum:'008618716005879',
                predictValue:this.selectCount.toString(),
                predictResult:val=='up'?1:-1,
            }
            this.axios.post(this.GLOBAL.baseUrl+'/predict/add',params)
                .then((res)=>{
                    let {state} = res.data
                    if(state=='success'){
                        this.showDialog=false
                        this.getPersonInfo()
                    }
                })
                .catch((err)=>console.log(err))
        },
        animationPlay:function () {
            let ele = this.$refs.dialogue.querySelectorAll('ul')
        },
    },
    async created(){
        const u3 = createU3(config);
        const balance = await u3.getCurrencyBalance({
          code: config.pointAccount,
          account: config.poolAccount,
          symbol: config.symbol
        });
        console.log(balance)
    },
    mounted() {
        this.getChatList()
        this.getLatestIndex()
        this.getPersonInfo()
        this.getTableData()
        this.$on('listenChatList',function () {
            this.getChatList()
        })
        /*this.intervalId = setInterval(() => {
            this.animationPlay()
        }, 2000)*/
    },
    beforeDestroy () {
        clearInterval(this.intervalId)
    }
}
</script>
