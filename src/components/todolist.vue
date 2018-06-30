<template>
    <div>
        <div class="inputTodo">
            <md-field>
                <label>Please Input</label>
                <md-input v-model="title" placeholder="add todolist" @keyup.enter="handleSubmit"></md-input>
            </md-field>
            <md-datepicker style="width: 300px" v-model="selectedDate" :md-open-on-focus="false"/>
            <div class="md-layout-item" >
                <md-field>
                    <md-select v-model="category" name="category" id="category" placeholder="Category">
                        <md-option v-for="bitem in bill" :value="bitem.title">{{ bitem.title }}</md-option>
                    </md-select>
                </md-field>
            </div>
            <md-button class="md-raised" @click="handleSubmit">Submit</md-button>
        </div>
        <md-button class="md-raised" @click="allItem">全部</md-button>
        <md-button class="md-raised" @click="selectCom">已完成</md-button>
        <md-table v-model="todos" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <!--测试搜索-->
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
                </md-field>
             </md-table-toolbar>
            <md-table-empty-state md-label="No tasks found"
            :md-description="`No task found for this '${search}' query. Try a different search term or create a new task.`">
                <md-button class="md-primary md-raised" @click="newUser">Create New task</md-button>
            </md-table-empty-state>

      <!--原代码-->
            <md-table-row slot="md-table-row" slot-scope="{ item }" class="md-primary" md-selectable="single">
                <md-table-cell>
                    <md-checkbox @change="editItem(item)" class="md-primary" v-model="item.completed">
                        </md-checkbox>
                </md-table-cell>
                <md-table-cell md-label="Title" md-sort-by="title">
                    <span 
                    :class="item.completed?'completed':''" @click="completed(index)" >{{ item.title }}</span>
                    <!-- <input class="edit" type="text" v-model="item.title" v-show="" v-todo-focus="item == editedTodo" @blur="doneEdit(todo)"
                         @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)">--></md-table-cell>
                    
                <md-table-cell md-label="Date" md-sort-by="date">{{ item.date }}</md-table-cell>
                <!-- <md-table-cell md-label="Due" md-sort-by="due">{{ item.due }}</md-table-cell> -->
                <md-table-cell md-label="Completed" md-sort-by="due">{{ item.completed }}</md-table-cell>
                <md-table-cell md-label="Category" md-sort-by="category">{{item.category}}</md-table-cell>
                <md-table-cell md-label="Options" @click="deleteTodo">
                    <md-button class="md-raised md-primary" @click="deleteTodo(item.id)">Delete</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <!-- <md-button class="md-raised" style="margin-left:55%;"@click="showToggle">{{btnText}}</md-button>
        <md-button class="md-raised" style="margin-right:0%;"@click="changeStyles">Change Styles</md-button> -->
    </div>
</template>

<script>
import bus from '../assets/bus'
let id=0
 const toLower = title => {
    return title.toString().toLowerCase()
  }
  const searchByName = (todos, term) => {
    if (term) {
      return todos.filter(item => toLower(item.title).includes(toLower(term)))
    }
    return todos
  }
export default {
    data:() => ({
            title:'',
            search:'',
            searched:[],
            date:'',
            due:'',
            category:'',
            states:['all','active','completed'],
            //todos:todoStorage.fetch(),
            //selectedDate:new Date('2018/1/1'),
            todos:[],
            filter:'all',//未完，不确定 删掉后,不现实todo页面
            btnText:"Hide",
            isShow:true,
            change:false 
    }),    
    created(){
        this.init()
    },           
    computed:{
        bill() {
            return this.$store.getters.bill
        },
        completedCounts(){
            return this.todos.filter(item=>item.completed).length
        },
        unCompletedCounts(){
            return this.todos.filter(item=>!item.completed).length
        },
        filteredTodos(){
            if(this.filter=== 'all'){
                return this.todos
            }
            const completed = this.filter==='completed'
            return this.todos.filter(todo => completed=== item.completed)
        }
    },
    filters:{
        all:todos=>todos,
        active:todos=>todos.filter(todo=>!todo.completed),
    },
    directives:{
        'todo-focus': function (el, value) {
            if (value) {
                el.focus()
            }
        }
    },
    methods:{
        // getClass: ({ id }) => ({
        // 'md-primary': item.id === 1,
        // 'md-accent': item.id === 2
        // }),
        // onSelect(item):{
            
        // },
        init() {
            if (this.title === "all") {
                this.todos = this.$store.getters.todos;
            }else{
                this.todos = this.$store.getters.getItemsbytitle(this.title);
            }
        },
        handleSubmit(){
            let nextItem = {
                id:id++,
                title:this.title,
                date:new Date(),
                due:this.selectedDate,
                category:this.category,
            }
            //加入了local storage功能后
            this.$store.commit('handleSubmit', nextItem)
            this.init()
            this.title=''
            //原始成功部分
            // this.todos.push(nextItem)
            // this.title=''
            // this.date=new Date()

            //原始部分
            //this.list.push(this.inputValue)
            //this.inputValue=''
        },
        //不确定用不用
        showToggle(){
                this.isShow=!this.isShow
                if(this.isShow){
                    this.btnText="Hide"
                }else{
                this.btnText="Show"
                }
            
        },
        changeStyles(){
            this.change=!this.change
        },
     
        hideCompleted(){
            
        },
        toggleFilter(state){
            this.filter=state
        },

        handleHash (choice) {
            for (let i = 0; i < this.hashChoices.length; i++) {
            this.hashChoices[i].isActive = false
            }
            choice.isActive = true
            this.hash = choice.hash
        },
        editItem(item){
            this.$store.commit('editItem', item)
        },
        allItem() {
            this.todos = this.$store.getters.todos;
        },
        editTodo(item){
            this.$store.commit('editTodo',item)
        },
        doneEdit(item){
            this.$store.commit('doneEdit',item)
        },
        cancelEdit(item){
            this.$store.commit('cancelEdit',item)
        },
        deleteTodo(id){
            //this.todos.splice(this.todos.findIndex(item=>item.title===title),1)

            //加入local storage功能后
            this.$store.commit('deleteTodo', id);
            //原始成功部分
            //this.todos.splice(this.todos.findIndex(item => item.id===id),1)
    
        },
        newUser(){

        },
        searchOnTable () {
            console.log(this.search)
            this.todos = searchByName(this.$store.getters.todos, this.search);
            this.search= ''
            //this.searched = searchByName(this.todos, this.search)
        },
        selectCom() {
            let completedItem = []
            this.todos.forEach((item) => {
                if(item.completed) {
                    completedItem.push(item)
                }
            });
            this.todos = completedItem;
        }
    },
    mounted() {
        var self = this;
        bus.$on('goListbyTitle', function(msg) {
            self.title = msg;
            self.init()
        });
    }
}
</script>

<style scoped>
.inputTodo{
    float:left;
    width:20%;
    margin-right:1%;
}
.completed{
    text-decoration: line-through;
}
.md-checkbox{
    display: flex;
}
.md-table{
    height:450px;
}
 .task-count {
    display: flex;
    margin: 10px 0;
  }

  .task-count li {
    padding-left: 10px;
    flex: 1;
    color: #dd4b39;
  }

  .task-count li:nth-child(1) {
    padding: 5px 0 0 10px;
  }

  .action {
    text-align: center;
    display: flex;
  }

  .action a {
    margin: 0px 10px;
    flex: 1;
    padding: 5px 0;
    color: #777;

  }

  .action a:nth-child(3) {
    margin-right: 0;
  }

  .active {
    border: 1px solid rgba(175, 47, 47, 0.2);
  }
</style>