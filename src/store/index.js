import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

const TODO_TODOS = 'todos'
const TODO_BILL = 'bill'
const LIST_NUM = 'listnum'
const USERS='users'
const USER_NUM='usernum'
const IS_LOGIN='islogin'

const state = {
  todos: JSON.parse(window.localStorage.getItem(TODO_TODOS) || '[]'),//对于localStorage中的数据采取json数组形式保存
  bill: JSON.parse(window.localStorage.getItem(TODO_BILL) || '[]'),
  users: JSON.parse(window.localStorage.getItem(USERS) || '[]'),
  islogin: window.localStorage.getItem(IS_LOGIN),
}

const getters = {
  todos: state => state.todos,
  bill: state => state.bill,
  users: state => state.users,
  islogin: state => state.islogin,
  getItemsbytitle: state => title => {
    let thisitems = [];
    state.todos.find(item => {
        if (item.category == title){
          thisitems.push(item)
        }
      });
    return thisitems;
  },
  getAllfinished(state) {
    var finish = [];
    state.todos.forEach((item) => {
      if(item.finished === true){
        finish.push(item);
      }
    })
    return finish;
  },
  getFinish: state => text => {
    state.todos.forEach((item) => {
      if(item.text === text){
        return item.finished
      }
    })
  }
}

const mutations = {
	addUser(state, obj) {
    console.log(obj)
		var user = obj.user;//修改不确定
		var password = obj.password;
    state.users.push({user: user, password: password})
  },
  //不确定，有问题
  listSubmit(state, obj) {
    let newList = {
        id: state.listnum++,
        title: obj.title,
        count: obj.count
      };
    state.bill.push(newList);
  },
  handleSubmit(state, obj) {
    var nextItem = {
        id:state.id++,
        title: obj.title,
        date: obj.date,
        due: obj.due,
        category:obj.category,
        completed: false
      };
    state.todos.push(nextItem);
  },
  editItem(state, obj) {
    console.log(obj)
  },
  editTodo(state,obj){
    state.beforeEditCache = item.title
    state.editedTodo = item
  },
  doneEdit(state,obj){
    if (!state.editedTodo) { return}
    state.editedTodo = null
    item.title = item.title.trim()
    if (!item.title) {
      state.removeTodo(item)
    }
  },
  cancelEdit(state,obj){
    state.editedTodo = null
    item.title = this.beforeEditCache
  },
  deleteTodo(state, id) {
    state.todos.splice(state.todos.findIndex(item => item.id === id), 1)
  },
  // updateFinished(state, title) {
  //   state.todos[state.todos.findIndex(item => item.title == title)].finished = !state.todos[state.todos.findIndex(item => item.title == title)].finished;
  // },
  setLogin (state, loginCompleted) {
    state.loginCompleted = loginCompleted;
  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, { todos, bill, islogin, users }) => {
    window.localStorage.setItem(TODO_TODOS, JSON.stringify(todos))//保存数据,将json转换为string
    window.localStorage.setItem(TODO_BILL, JSON.stringify(bill))
    window.localStorage.setItem(IS_LOGIN, islogin)
    window.localStorage.setItem(USERS, JSON.stringify(users))

  })
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [localStoragePlugin]
})