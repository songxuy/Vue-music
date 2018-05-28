<template>
  <div class="player">
    <audio id="p1" :src="item.filename"></audio>
    <div class="desc">
      <transition>
        <img v-bind:src="item.poster" :alt="item.name" :style="{transform:'rotate('+(current*4/duration*360*2)+'deg)'}"/>
      </transition>
    </div>
    <h2 class="title">{{item.name}}</h2>
    <h2 class="artist">{{item.artist}}</h2>
    <div id="lyric" class="lyric">
      <p class="previous" v-for="(item,index) in lines" :class="currentLine==index?currentClass:''">
        {{item.text}}
      </p>
    </div>
    <div class="controls">
      <button class="active" @click="prev()"><i class="fa fa-backward"></i></button>
      <button class="active" @click="play()"><i class="fa" :class="{'fa-play':!item.playing,'fa-pause':item.playing}"></i></button>
      <button class="active" @click="next()"><i class="fa fa-forward"></i></button>
    </div>
  </div>
</template>

<script>
import '../assets/css/app.css'
import '../assets/css/font-awesome.css'
import '../assets/css/normalize.css'
import $ from 'jquery'

export default{
  name:'player',
  data(){
    return {
          item:{},
          lines:[],
          currentLine:"w",
          currentClass:"current",
          lrccurrent:0,
          current:"",
          currentindex:0,
          duration:0
    }
  },
  mounted(){
    var that =this;
    var id = this.$route.params.id;
    this.$store.state.musiclist.forEach((a,index)=>{
      if(a._id==id){
        that.item =a;
        that.init();
      }
    })
  },
  methods:{
    init:function(){
      this.item.playing = false;
      var i=1;
      document.getElementById('p1').addEventListener('timeupdate',()=>{
        if(document.getElementById('p1')){
        this.current=document.getElementById('p1').currentTime;
        }
        var oldtime=this.lines[this.lrccurrent].time.split(":");
        var lrctime=parseInt(oldtime[0])*60+parseInt(oldtime[1]);
        var str1=this.current-lrctime;
        //console.log($('.lyric p').eq(this.lrccurrent).offset().top+" "+$('.lyric').scrollTop())
        if(document.getElementById('lyric')){
          if($('.lyric p').eq(this.lrccurrent).offset().top>=423){
          $('.lyric').scrollTop(50*i);
          i++;
          }
        }
        //console.log(this.current+" "+lrctime);
        if(str1>0||str1==0){
          this.currentLine=this.lrccurrent;
          this.lrccurrent+=1;
        }
      })
      this.fetch();
    },
    prev:function(){
      var number=--this.currentindex;
      if(number<0){
        number=0;
        this.currentindex=number;
      }else{
      }
      this.item=this.$store.state.musiclist[number];
      this.current=0;
      this.currentLine="w";
      this.lrccurrent=0;
      this.item.playing=true;
      this.init();
    },
    next:function(){
      var number=++this.currentindex;
      if(this.$store.state.musiclist.length-1<number){
        number=this.$store.state.musiclist.length-1;
        this.currentindex=number;
      }else{
      }
      this.item=this.$store.state.musiclist[number];
      this.current=0;
      this.currentLine="w";
      this.lrccurrent=0;
      this.item.playing=true;
      this.init();
    },
    play:function(){
      //console.log(this.item.playing)
      if(this.item.playing){
        document.getElementById("p1").pause();
      }else{
        document.getElementById("p1").play();
        this.duration=document.getElementById('p1').duration
      }
      this.item.playing=!this.item.playing;
    },
    fetch:function(){
      this.lines=[];
      var lines = this.item.lrc.split("\n");
      for(var k in lines){
        var timemarch = lines[k].match(/\[(\d+:\d+\.\d+)]/)
        this.lines.push({
          time:timemarch?timemarch.pop():"",
          text:lines[k].replace(/^.+?\]/,"")
        })
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player{
  position: absolute;
  background-color: #3d3d3d;
  width:100%;
}
.player .desc{
  position: relative;
  width:100px;
  height:100px;
  margin: 0 auto;
}
.player .desc img{
  width:100px;
  height:100px;
  border-radius: 50%;
  border:2px solid yellow;
}
.title{
  font-size: 16px;
  color:yellow;
  width:100%;
  text-align: center;
  padding:10px 0;
}
.artist{
  width:100%;
  text-align: center;
  font-size: 18px;
  color:#ffffff;
}
.lyric{
  width:100%;
  text-align: center;
  color:#ccc;
  height:400px;
  overflow-y: scroll;
  font-size: 14px;
}
.lyric p{
  margin-top:10px;
}
.lyric p:last-child{
  margin-bottom:250px;
}
.controls{
  width:100%;
  background-color: #000000;
  height:40px;
}
.controls .active{
  height:40px;
  width:32%;
  background-color: #000000;
  border:none;
}
.controls .active i{
  color:yellow;
}
button:focus{
  outline:none;
}
.current{
    color:yellow;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
  background-color: #3d3d3d;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
  /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;*/
  background-color: #3d3d3d;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
  /*border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);*/
  background-color: #3d3d3d;
}
</style>
