<template>
  <div class="list">
    <ol>
      <li v-for="item in list">
        <a @click="play(item._id)">
        <div class="info">
          <h3 class="title">
            {{item.name}}
          </h3>
          <span class="artist">
            {{item.artist}}
          </span>
        </div>
        <span class="time">
          {{item.duration}}
        </span>
        <div class="photo"><img :src="item.poster" :alt="item.name" /></div>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import '../assets/css/app.css'
import '../assets/css/font-awesome.css'
import '../assets/css/normalize.css'
import axios from 'axios'

export default{
  name:'list',
  data(){
    return {
      list:[]
    }
  },
  mounted(){
    //查询所有的
    axios.get("http://127.0.0.1:3000/all").then((val)=>{
      this.$store.commit("INITMUSIC",val.data);
      this.list=val.data;
      console.log(this.list)
    })
  },
  methods:{
    play:function(id){
      this.$router.push('/item/'+id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ol{
  width:100%;
  position: absolute;
}
ol li{
  display: inline-block;
  width:100%;
  background-color: #222;
  height:50px;
  border-top:1px solid deepskyblue;
  clear: both;
}
ol li .info{
  position: relative;
  padding:5px 20px;
  width:60px;
  height:40px;
}
ol li .info .title{
  font-size: 12px;
  color:yellow;
  font-weight: bold;
}
ol li .info .artist{
  color:#ffffff;
  font-size: 14px;
}
ol li .time{
  height:50px;
  line-height: 50px;
  float:right;
  margin-right:60px;
  color:#ffffff;
  margin-top:-50px;
}
ol li .photo{
  width:40px;
  height:40px;
  float:right;
  right:0px;
  position: absolute;
  margin-top:-45px;
  line-height: 40px;
  margin-right:10px;
}
ol li .photo img{
  width:40px;
  height:40px;
  border-radius: 50%;
}
</style>
