<template>
    <div>
         <div @click='subStrict' class='left'>-</div>
         <div class="middle">{{initCount}}</div>
         <div @click='add' class="right">+</div>
    </div>
   
</template>
<style>
 .left,.middle,.right{
     display: inline-block;
     border:1px solid rgba(90, 90, 90, 0.4);
     width: 25px;
     height: 30px;
     text-align: center;
     line-height: 30px;
     
 }
 .middle {
     width: 30px;
     margin: 0 5px;
 }
</style>
<script>
    export default {
        props:['goodsId','count'],
        data(){
            return{
                initCount:0
            } 
        },
        created(){
            this.initCount=this.count;
        },
        methods:{
            subStrict(){
                if(this.initCount==1){
                     return;
                }
                this.initCount--;  
                this.notify()             
            },
            add(){
                this.initCount++;
                this.notify()
            },
            notify(){
                this.$emit('goodsCountChange',{
                    goodsId:this.goodsId,
                    count:this.initCount       
                })
            }
        }

    }

</script>

