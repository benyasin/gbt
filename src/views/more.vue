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
                   <button class="btn tab-btn active" @click="handleTab($event,'活跃度排行')">活跃度排行</button>
                   <button class="btn tab-btn" @click="handleTab($event,'胜率排行')">胜率排行</button>
               </div>
               <div class="list">
                   <div class="list-block" v-for="(itm,index) in tableData[tabIndex]" :key="index">
                       <span class="sp1-more">{{itm.rank}}</span>
                       <img width="32px" height="32px" src="../assets/img/comment.png" alt="">
                       <span class="sp2-more">{{itm.name}}</span>
                       <span class="sp3-more">{{itm.decs}}<span class="sp4-more" v-if="tabIndex=='活跃度排行'">活跃度</span></span>
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
        name: "more",
        data(){
            return{
                user:{
                    avatar:'../assets/img/sGoldEgg.png',
                    name:'三生三世',
                    price:33,
                },
                tabIndex:'活跃度排行',
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
                        {name:'胜率daren',avatar:'',rank:'1',decs:'100%'},
                        {name:'lallafdfs',avatar:'',rank:'1',decs:'100%'}]},
            }
        },
        created(){
            this.tabIndex = this.tablist[this.$route.params.index]
        },
        mounted(){
            if(this.$route.params&&this.$route.params.index==1){
                this.handleTabWin()
                this.tabIndex = this.tablist[this.$route.params.index]
            }else{
                this.tabIndex = this.tablist[0]
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
            handleTabWin(){
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item=>{
                    item.className ='btn tab-btn'
                })
                eles[1].className='btn tab-btn active'
            },
        },
    }
</script>


