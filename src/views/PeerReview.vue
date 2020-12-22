<template>
  <div>
    <div class="peer-review-search-wrap">

      <div class="peer-review-search-content">
        <div class="peer-review-name">
          <code class="text">Your Name: </code>
          <el-input
            v-model="name"
            class="local-input"
          ></el-input>
        </div>
        <div class="peer-review-affiliation">
          <code class="text">Your Affiliation: </code>
          <el-input
            v-model="affiliation"
            class="local-input"
          ></el-input>
        </div>
        <div class="peer-review-terms">
          <code class="text">Terms: </code>
<!--          <el-input-->
<!--            v-model="terms"-->
<!--            class="local-input"-->
<!--          ></el-input>-->
          <el-autocomplete
            class="local-input"
           v-model="terms"
          :fetch-suggestions="queryTerms"
          :trigger-on-focus="false"
          @select="handleSelect">
          </el-autocomplete>
        </div>
      </div>

      <el-button @click="searchPeerReviewer" class="peer-review-search-confirm">Search Reviewers</el-button>
    </div>

    <div class="peer-reviewer-list-wrapper">
      <span class="reviewer-list-title">Recommended Peer-Reviewers List</span>

      <div class="peer-reviewer-list-content" id="list-content">

      </div>

    </div>
  </div>
</template>

<script>

import {autoComplete, searchPeerReviewer} from "../api/api";
  import Search from "../components/Search";
  import $ from 'jquery';
  import 'jquery';

  export default {
    name: "PeerReview",
    components: {Search},

    data(){
      return{
        name: '',
        affiliation: '',
        terms: '',
        reviewerList: []
      }
    },
    mounted(){

    },

    methods:{

      searchPeerReviewer: function () {
        if(this.name !== '' && this.affiliation !== '' && this.terms !== '') {
          searchPeerReviewer(this.name, this.affiliation, this.terms).then(res=>{
            //更新评议者的列表显示
            let stars = ['★','★★','★★★','★★★★','★★★★★','★★★★★★','★★★★★★★',
              '★★★★★★★★','★★★★★★★★★','★★★★★★★★★★'];
            let number = 1;
            let revlist = res.content;
            let blockHtml = '';

            let pMax = Math.ceil(revlist[0].pop);
            let pMin = Math.ceil(revlist[revlist.length - 1].pop);
            console.log(pMax);
            console.log(pMin);

            revlist.forEach(function (reviewer) {
              // 将推荐值映射到1~10星
              let popVal = Math.ceil(reviewer.pop);
              let normalize = Math.floor(9 * (popVal - pMin) / (pMax - pMin));
              while(normalize < 0) {
                normalize += 1;
              }
              let star = stars[normalize > 9 ? 9 : normalize];

              // 添加内容到字段列表
              blockHtml += '<div class="peer-reviewer-block" style="width: 40vw">\n' +
                '          <div class="number-label" style="color: #6d6d6d; font-family: \'Arial\', sans-serif; ' +
                'font-size: 15px; user-select: none; width: 30px; display: inline-block">' + number + '</div>\n' +
                '          <div class="reviewer-name" style="font-family: \'Arial\', sans-serif;display: inline-block; ' +
                'font-size: 15px; margin-left: 20px; width: 250px">' + reviewer.authorName + '</div>\n' +
                '          <div class="recommend-stars" style="font-family: \'Arial\', sans-serif; display: inline-block; ' +
                'font-size: 15px; color: #e29633; user-select: none; margin-left: 40px">' + star + '</div>\n' +
                '        </div>';
              number += 1;
            });

            //$('#list-content').empty();
            document.getElementById("list-content").innerHTML = "";
            $('#list-content').append(blockHtml);

          })
        } else {
          this.$message({
            message:'Filter conditions cannot be empty!',
            type: 'error',
            duration: 1500
          });
        }
      },
      queryTerms(queryString, cb){
        autoComplete(queryString).then(res=>{
          let results=res.map(
            v=>{
              let sin={};
              sin['value']=v;
              return sin;
            }
          );
          cb(results);
        })
      },
      handleSelect(item) {
        console.log(item);
      }

    }
  }
</script>

<style scoped>
  .peer-review-search-wrap{
    margin: 50px auto;
    padding: 32px 0;
    width: 80vw;
    box-shadow: 0 0 20px 4px #eff3fa;
  }
  .peer-review-search-content{
    text-align: left;
    font-family: 'Arial', sans-serif;
    margin: 0 6vw;
  }
  .peer-reviewer-list-wrapper{
    margin: 15px auto;
    padding: 20px 0;
    width: 80vw;
    box-shadow: 0 0 20px 4px #eff3fa;
    font-family: 'Arial', sans-serif;
  }
  .peer-reviewer-list-content {
    text-align: left;
    font-family: 'Arial', sans-serif;
    margin: 15px 2vw;
  }
  .peer-reviewer-block {
    font-family: 'Arial', sans-serif;
    margin-top: 5px;
    width: 30vw;
  }
  .number-label {
    color: #6d6d6d;
    font-family: 'Arial', sans-serif;
    font-size: 15px;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .recommend-stars {
    float: right;
    color: #e29633;
    font-family: 'Arial', sans-serif;
    font-size: 15px;
    margin-left: 30px;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }
  .reviewer-name {
    font-family: 'Arial', sans-serif;
    font-size: 15px;
    margin-left: 15px;
  }
  .reviewer-list-title {
    font-family: 'Arial', sans-serif;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    color: #909399;
  }
  .peer-review-name{
    display: flex;
    margin: 2px 0;
  }
  .peer-review-affiliation{
    display: flex;
    margin: 12px 0;
  }
  .peer-review-terms{
    display: flex;
    margin: 12px 0;
  }
  .text{
    margin-right: 8px;
    font-size: 15px;
    line-height: 42px;
    width: 8vw;
    min-width: 104px;
    font-family: 'Arial', sans-serif;
  }
  .local-input{
    border: 1px solid #e9edf4;
    width: 60vw;
    border-radius: 5px;
  }
  .peer-review-search-confirm{
    margin: 5px;
    padding: 10px 16px;
  }
</style>
