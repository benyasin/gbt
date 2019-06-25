<template>
    <div class="gbt-mine">
        <x-icon class="icon" @click="goback" type="ios-arrow-thin-left" size="30"></x-icon>
       <div class="gbt-mine-header">
           <img src="../assets/img/sGoldEgg.png" width="69px" height="69px" alt="">
           <span class="name">{{user.name}}</span>
           <div class="price">
               <img src="../assets/img/sGoldEgg.png" width="23px" height="23px" alt="">
               <span class="count">X{{user.price}}</span>
               <span class="desc">金蛋奖励</span>
           </div>
       </div>
       <div class="gbt-mine-content">
           <div class="info">
               <div><p class="rank">999+</p><p class="desc">活跃度排行</p></div>
               <div><p class="rank">999+</p><p class="desc">胜率排行</p></div>
               <div><p class="rank">100%</p><p class="desc">胜率</p></div>
               <div><p class="rank">3次</p><p class="desc">预言战绩</p></div>
           </div>
           <div class="tab">
               <div class="btns" ref="tabbtns">
                   <button class="btn tab-btn active" @click="handleTab($event,'我的预言')">我的预言</button>
                   <button class="btn tab-btn" @click="handleTab($event,'我的奖励')">我的奖励</button>
               </div>
               <div class="list">
                   <div class="list-block" v-for="(itm,index) in tableData[tabIndex]" :key="index" @click="toRouter(itm)">
                       <p class="item" v-if="tabIndex=='我的预言'">
                        <span class="sp1">{{itm.count}}积分预言</span>
                        <span class="sp2">{{itm.date}}</span>
                       </p>
                       <p class="item-sub" v-if="tabIndex=='我的奖励'">
                           <span class="sp1">金蛋来访</span>
                           <span class="sp2">{{itm.date}}</span>
                       </p>
                       <p class="item item-sub" v-if="tabIndex=='我的预言'">
                        <span class="sp3" v-if="itm.status=='success'">{{itm.price}}积分</span>
                        <span class="sp3">{{itm.status=='success'?'成功':'失败'}}</span>
                        <button class="btn"><img src="../assets/img/arrowR.png" width="7px" height="11px" alt=""></button>
                       </p>
                       <p class="item item-sub" v-if="tabIndex=='我的奖励'">
                           <span class="sp3">领取{{itm.price}}积分</span>
                       </p>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
    import '../assets/scss/mine.scss'
    export default {
        components:{
        },
        name: "mine",
        data(){
            return{
                user:{
                    avatar:'../assets/img/sGoldEgg.png',
                    name:'三生三世',
                    price:33,
                },
                tabIndex:'我的预言',
                tableData:{
                    '我的预言':[{count:'20',date:'2018-03-13',price:'+30',status:'success',deraction:'up',result:'0',resultDeraction:'up'},
                        {count:'20',date:'2018-03-13',price:0,status:'failed',deraction:'up',result:'0',resultDeraction:'down'},
                        {count:'20',date:'2018-03-13',price:'+30',status:'success',deraction:'down',result:'1',resultDeraction:'down'},
                        {count:'20',date:'2018-03-13',price:0,status:'failed',deraction:'down',result:'2',resultDeraction:'up'},
                        {count:'20',date:'2018-03-13',price:'+100',status:'success',deraction:'down',result:'0',resultDeraction:'down'},
                        {count:'20',date:'2018-03-13',price:'0',status:'failed',deraction:'up',result:'2',resultDeraction:'down'},
                        {count:'20',date:'2018-03-13',price:'+30',status:'success',deraction:'up',result:'1',resultDeraction:'up'},
                        {count:'20',date:'2018-03-13',price:'+30',status:'success',deraction:'up',result:'1',resultDeraction:'up'}],
                    '我的奖励':[{date:'2018-03-13',price:'100'},
                        {date:'2018-03-13',price:'30'},
                        {date:'2018-03-13',price:'10'},]},
            }
        },
        created(){
            this.tabIndex = this.$route.params.index==0?'我的预言':'我的奖励'
        },
        mounted(){
            if(this.$route.params&&this.$route.params.index==1){
                this.handleTabPrice()
                this.tabIndex='我的奖励'
            }else{
                this.tabIndex='我的预言'
            }
        },
        methods:{
            goback(){
              this.$router.go(-1)
            },
            handleTab(e,val){
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item=>{
                    item.className ='btn tab-btn'
                })
                e.target.className='btn tab-btn active'
                this.tabIndex=val
            },
            handleTabPrice(){
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item=>{
                    item.className ='btn tab-btn'
                })
                eles[1].className='btn tab-btn active'
            },
            toRouter(itm){
                console.log(itm)
                this.$router.push({
                    name: 'MineDetails',
                    params: itm
                })
            },
        },
    }
</script>


