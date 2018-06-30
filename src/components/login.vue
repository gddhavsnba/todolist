<template>
    <div>
        <md-card class="log">
            <md-card-media-actions class="picture">
                <md-card-media>
                    <img src="../assets/SydneyClimbers.jpg" alt="Cover">
                </md-card-media>

            <md-card-area>
            <md-field>
            <label>Username</label>
            <md-input v-model="user"></md-input>
            <span class="md-helper-text">Username</span>
        </md-field>
        <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password" @keyup.enter="logIn"></md-input>
            <span class="md-helper-text">Password</span>
        </md-field>
                </md-card-area>

        <md-card-actions>
          <md-button class="md-raised" @click="logIn">Log IN</md-button>
        </md-card-actions>
      </md-card-media-actions>
    </md-card>
    
    
       
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:'',
            password:'',
            loginCompleted:false
        }
    },
    computed:{
        users(){
            return this.$store.getters.users
        }
    },
    methods:{
        logIn(){
            var user=this.$store.getters.users.find(user=>{
                return (this.user===user.user)&&(this.password===user.password);
            })
            if(!user){
                this.$store.commit('setLogin',false)
            }else{
                this.$store.commit('setLogin',true)
                this.$router.push('/todolist')//不确定改的
            }
        }
    },
    created(){
        var user={
            user:'gddhavsnba',
            password:'gddhavsnba'
        };
        this.$store.commit('addUser',user)
    }
}
</script>

<style>
.log{
    width:50%;
    height:400px;
    display:inline-block;
    margin-top:8%;

}
.picture{
    margin-top:15%;
}
</style>
