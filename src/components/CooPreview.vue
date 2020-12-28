<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="header_style"
    :cell-style="cell_style"
    @cell-click="enter">
    <el-table-column
      header-align="center"
      prop="author"
      label="Name"
      width="160">
    </el-table-column>
    <el-table-column
      prop="affiliation"
      label="Affiliation"
      width="720">
    </el-table-column>
    <el-table-column
      prop="value"
      label="Possibility">
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: "CooPreview",
  props: ['cooList'],
  data(){
    return{
      tableData:[]
    }
  },
  mounted() {
    let hands=["🤝","🤝🤝","🤝🤝🤝","🤝🤝🤝🤝","🤝🤝🤝🤝🤝"];
    let posMax=0;
    let posMin=0;
    if(this.cooList.length>1){
      posMax=Math.ceil(this.cooList[0].possibility);
      posMin=Math.ceil(this.cooList[this.cooList.length-1].possibility);
    }
      this.tableData = this.cooList.map(
        coo => {
          let data = {};
          data['author'] = coo.name;
          data['authorId'] = coo.id;
          data['affiliation'] = coo.affiliation;
          data['affiliationId'] = coo.affiliationId;
          let posVal=Math.ceil(coo.possibility);
          let normalize = Math.floor(4 * (posVal - posMin) / (posMax - posMin));
          while(normalize < 0) {
            normalize += 1;
          }
          let hand = hands[normalize > 4 ? 4 : normalize];
          data['value'] = hand;
          return data;
        }
      )
  },
  methods:{
    enter(row, column){
      // alert(row+" "+column+" "+cell+" "+event)
      if(column.property!=='value') {
        let id = column.property === 'author' ? row.authorId : row.affiliationId;
        window.location.href = '/entity/' + column.property + '/' + id;
      }
    },
    header_style(){
      return 'text-align-last:center;'
    },
    cell_style({columnIndex}){
      if(columnIndex!==3){
        return 'color:#006699'
      }else{
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
