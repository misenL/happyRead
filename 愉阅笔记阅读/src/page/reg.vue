<template>
    <div>
    <x-header title="用户注册"></x-header>
    <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input title="用户名" type="text" placeholder="用户名输入" v-model="userName"></x-input>
        <x-input title="密码" type="password" placeholder="密码输入" v-model="password"></x-input>
        <x-input title="确认密码" type="password" placeholder="再次确认" v-model="password_ag"></x-input>
        <x-address title="地址" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>    
        <radio :selected-label-style="{color: '#FF9900'}" :options="radio001" v-model="gender" @on-change="change"></radio>
        
    </group>
    <a @click="addUser()"><box gap="10px 10px">
      <x-button :gradients="['#01d0ff', '#FF9500']">注册</x-button>
    </box></a>
    <alert v-model="show" title="警告">{{tipmsg}}</alert>

    <toast v-model="showPositionValue" text="注册成功"></toast>
    </div>
</template>
<script>
import { Group, XInput, Selector, XNumber, XAddress,ChinaAddressData, XHeader, XButton, Box, Alert, Toast, Radio} from 'vux'

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
        Alert,
        Toast,
        Radio
    },
    data () {
      return {
        addressData: ChinaAddressData,
        addressValue: ['广东省', '深圳市', '南山区'],
        userName: '',
        password: '',
        password_ag: '',
        show:false,
        tipmsg:'',
        regInfo:{},
        showPositionValue: false,
        radio001: [ 'male', 'female' ],
        gender: 'male'
      }
    },
    methods:{
        addUser(){
            let _this = this;
            var name = _this.userName;
            var password = _this.password;
            var gender = _this.gender;
            var userimg = 'http://www.qqzhi.com/uploadpic/2014-05-14/051120936.jpg';
            if(_this.userName=='' || _this.password=='' || _this.password_ag==''){
                this.show=true;
                this.tipmsg='您尚未完善信息！'
            }else if(_this.password != _this.password_ag){
                this.show=true;
                this.tipmsg='确认密码是否一致！'
            }else{
                console.log('注册成功')
                this.$http.post(this.HOST+'api/user/register',{
                    username:name,
                    password:password,
                    gender:gender,
                    userimg:userimg
                },{emulateJSON:true}).then((response)=>{
                    console.log(response)
                    if(response.data == "用户名已被注册"){
                        this.show = true;
                        this.tipmsg = '该用户名已被占用！';
                        setTimeout(() => {
                            this.show = false;
                        }, 1500);
                    }else{
                        this.show = true;
                        this.tipmsg = '注册成功！';
                        setTimeout(() => {
                            this.show = false;
                            this.$router.push('/index/login')
                        }, 1500);
                    }

                })
            }
        },
        
        change (value, label) {
            console.log('change:', value, label)
        }
    }
}
</script>
<style scoped>

</style>