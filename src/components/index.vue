<template>
  <div class="page-container">
    <md-dialog :md-active.sync="showAdd" style="padding: 20px">
      <md-dialog-title>Please input listname</md-dialog-title>
      <md-field>
        <label>List Name</label>
        <md-input v-model="title"></md-input>
      </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAdd = false">Close</md-button>
        <md-button class="md-primary" @click="addBill();showAdd = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-app md-waterfull md-mode="fixed" >
      <md-app-toolbar class="md-primary" md-elevation="0" v-bind:style="styleObject">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon><img src='../assets/icons/category.png'></md-icon>
        </md-button>
        <span class="md-title">To Do List</span>
        <md-button class="md raised" @click="logOut" style="float:right;margin-left:92%;margin-top:-3%;">Log Out</md-button>
        <div class="avatar">
          <md-avatar class="md-avatar-icon">
            <img src="../assets/icons/account.png" alt="avatar">
          </md-avatar>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini" class="md-scrollbar">

        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon><img src="../assets/icons/backblack.png"></md-icon>
            </md-button>
          </div>
        </md-toolbar>


        <md-list>
           <md-list-item href="#" @click='goTitle("all")'>
            <!-- <md-icon><img src="../assets/icons/delete.png"></md-icon> -->
            <span class="md-list-item-text">All</span>
          </md-list-item>
          <md-list-item href="#" v-for="list in bill" @click="goTitle(list.title)">
            <!-- <md-icon><img src="../assets/icons/delete.png"></md-icon> -->
            <span class="md-list-item-text">{{ list.title }}</span>
          </md-list-item>
          <md-list-item href="#" @click="showAdd = true">
            <span class="md-list-item-text">
              <md-icon><img src="../assets/icons/addblack.png"></md-icon>
              <!--+add--></span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content  md-persistent="full" >
        <to-do></to-do>
        </md-content>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import todolist from './todolist'
  import bus from '../assets/bus'
  export default {
    components:{
      'to-do':todolist,
    },
    data: () => ({
      styleObject:{
        backgroundColor:'#BC8F8F'
      },
      title: '',
      menuVisible: false,
      showAdd: false,
      listname: '',
      active:false,
      value:''
    }),
    computed: {
      bill() {
        return this.$store.getters.bill;
      }
    },
    created() {

    },
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      listSubmit(){
        this.bill.push(this.value)
        //this.value=''
      },
      deleteContent(){
        this.value=''
      },
      addBill() {
        let newBill = {
          title: this.title,
          count: 0
        };
        this.$store.commit('listSubmit', newBill);
        this.title = '';
      },
      goTitle(title) {
        bus.$emit('goListbyTitle', title)
      },
      logOut() {
      this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  .md-app {
    min-height: 600px;
    border: 1px solid rgba(#000, .12);
  }

   /*Demo purposes only*/
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
  .md-content{
    height: 400px;
  }
  .tab{
    float:left;
    margin-bottom:-120px;
    margin-left:20%;
  }
  .avatar{
    float:right;
    margin-left:86%;
    margin-top:-3%;
  }
  /* .searchicon{
    float:left;
    margin-top:10%;
   // width:10px;
   //padding-right:5%;
  }
  .search{
    float:right;
    height:20px;
    //width:100px;
    margin-top:-7%;
    margin-left:70%;
  }
  .searchinput{
    //width:20%;
    float:left;

    margin-left:10px;
  } */
  .todo{
    float: left;
    /* //width:30%;
    //height:600px;
    //margin-right: 1%; */
  }
  .page{
    float:left;
   /* // width:60%; */
    padding:0 15%;
    margin-top:-1%;
    padding-left:20%;
  }
  .md-tab{
    padding:0;
  }
  .add{
    position: absolute;
    /* //margin-bottom:200%; */
    margin-left:8px;
  }
  .datepicker{
    float: left;
    width:20%;
    margin-right:1%;
  }
  .select{
    float:left;
    width:25%;
  }
</style>
