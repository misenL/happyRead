<template>
    <div>
    <x-header title="帐号登录"></x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="用户名：" type="text" placeholder="用户名输入" v-model="login_name" id="textTop"></x-input>
        <x-input title="密码：" type="password" placeholder="密码输入" v-model="login_password" id="passWord"></x-input>
    </group>
    <a @click="login()"><box gap="10px 10px">
      <x-button :gradients="['#01d0ff', '#FF61AD']">登录</x-button>
    </box></a>
    <alert v-model="show" title="提示">{{tipmsg}}</alert>
    </div>
    
</template>
<script>
import { Group, XInput, Selector, XNumber, XAddress,ChinaAddressData, XHeader, XButton, Box, Alert} from 'vux'
import {mapActions} from 'vuex'
export default{
    components:{
        Group,
        XInput,
        Selector,
        XNumber,
        XAddress,
        ChinaAddressData,
        XHeader,
        XButton,
        Box,
        Alert
    },
    data () {
      return {
        addressData: ChinaAddressData,
        login_name: '',
        login_password: '',
        tipmsg: '',
        show: false
      }
    },
    methods:{
        login(){
            let loginName = this.login_name;
            let loginPassword = this.login_password;
            if (loginName == '' || loginPassword == '') {
                this.show = true;
                this.tipmsg = '用户名或密码为空'
            }else{
                
                this.$http.post(this.HOST+'api/user/login',{
                    username:loginName,
                    password:loginPassword,
                    userId:''
                },{emulateJSON:true}).then((response)=>{
                    console.log(response)
                    if(response.data.msg.status == "err"){
                        this.show = true;
                        this.tipmsg = '账号或密码有误';
                        setTimeout(() => {
                            this.show = false;
                        }, 1500);
                    }else{
                        this.show = true;
                        this.tipmsg = '登陆成功！';
                        setTimeout(() => {
                            this.show = false;
                            this.$router.push('/')
                        }, 1500);
                        // console.log('my datas',response)
                        var loginUserObj={username:response.body.msg.text,userId:response.body.msg.userId};
                        this.$store.dispatch("userchange",loginUserObj)
                        console.log(response.body)
                    }


                })
            }
    }
    }
}
</script>
<style scoped>
#textTop {
    color: #5d5d5d;    
}
#textTop input {
    color: #e2e2e2 !important;
}
#passWord {
    color: #5d5d5d;    
}
</style>