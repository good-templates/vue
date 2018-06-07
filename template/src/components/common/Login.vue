<template>
  <div class="modal-box vertical-center" @click.stop>
    <div class="modal-title"></div>
    <div class="modal-inputs modal-inputs-iphone">
      <input class="modal-inputs-input" v-model="inputs.phone" placeholder="请输入您的手机号码"
             oninput="if(value.length>11)value=value.slice(0,11)"
             onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"/>
      <div class="cha" v-show="inputs.phone" @click="remove('phone')"></div>
    </div>
    <div class="modal-inputs modal-inputs-ivcode" v-show="!passLogin">
      <input class="modal-inputs-input" style="background:none;z-index:0;width:2rem"
             v-model="inputs.vercode"
             oninput="if(value.length>6)value=value.slice(0,6)"
             onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
             placeholder="短信验证码"/>
      <button type="button" class="modal-inputs-vcode"
              v-text="isVericode.text"
              :disabled="inputs.phone.length!=11||isVericode.isSend"
              @click="getVericode">
      </button>
      <div class="cha" v-show="inputs.vercode" @click="remove('vercode')"></div>
    </div>
    <div class="modal-inputs modal-inputs-ipassword" v-show="passLogin">
      <input class="modal-inputs-input" v-model="inputs.pwd"
             placeholder="请输入您的登录密码"
             :type="eyes?'text':'password'"/>
      <div @click="changePwd" :class="['eye',eyes?'icon-yanjing1':'icon-yanjing']"></div>
      <div class="cha" v-show="inputs.pwd" @click="remove('pwd')"></div>
    </div>
    <div class="modal-control">
      <button class="modal-button-login"
              v-text="!passLogin?'登录/注册':'登录'"
              :disabled="inputs.phone.length!=11||
              (passLogin?!inputs.pwd||inputs.pwd.length<6:!inputs.vercode||
              inputs.vercode.length!=6)"
              @click="toLogins">
      </button>
    </div>
    <div class="modal-buttons" v-if="!passLogin" @click="switchLogin">密码登录</div>
    <div class="modal-buttons" v-else @click="switchLogin">
      <div class="col1">注册领红包</div>
      <div class="col2">快捷登录</div>
    </div>
    <div class="modal-button-close" @click="close"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Toast from './Toast';

export default {
  name: 'Login',
  data() {
    return {
      passLogin: false,
      eyes: false,
      isVericode: {
        isSend: false,
        text: '获取验证码',
      },
      inputs: {
        phone: '',
        vercode: '',
        pwd: '',
      },
    };
  },
  components: {
    Toast,
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getVericode(e) {
      if (!e.srcElement.disabled) {
        this.getCode();
      }
    },
    getCode() {
      this.isVericode.isSend = true;
      // this.$ajax
      //   .post(`${ZYLIB.api.platform}/Userpub/sendsms`, {
      //     phone: this.inputs.phone,
      //     smsType: 'appLogin',
      //   })
      this.$ajax({
        method:'post',
        url:`${ZYLIB.api.platform}/Userpub/sendsms`,
        data:{
          phone: this.inputs.phone,
          smsType: 'appLogin',
        }
      })
        .then(
          (res) => {
            console.log(res)
            if (res.data.code == 10000 || res.data.code == 99995) {
              if (res.data.data && res.data.data.ttl) {
                this.countDown(res.data.data.ttl);
              } else {
                this.countDown(120);
              }
            } else {
              this.isVericode.isSend = false;
            }
          },
          (err) => {
            console.log(err);
          },
        );
    },
    countDown(time) {
      this.timer = setInterval(() => {
        if (time > 0) {
          this.isVericode.isSend = true;
          this.isVericode.text = `重新获取(${time})`;
          time--;
        } else {
          clearInterval(this.timer);
          this.isVericode = {
            isSend: false,
            text: '获取验证码',
          };
        }
      }, 1000);
    },
    toLogins(e) {
      if (!e.srcElement.disabled) {
        this.isLogin();
      }
    },
    async isLogin() {
      // this.$ajax
        // .post(`${ZYLIB.api.platform}/Userpub/login`, {
        //   phone: this.inputs.phone,
        //   platform: 'H5',
        //   userPwd: this.inputs.pwd,
        //   veriCode: this.inputs.vercode,
        //   contractId: '999920171021200000',
        // })
        this.$ajax({
        method:'POST',
        url:`${ZYLIB.api.platform}/Userpub/login`,
        data:{
          phone: this.inputs.phone,
          platform: 'H5',
          userPwd: this.inputs.pwd,
          veriCode: this.inputs.vercode,
          contractId: '999920171021200000',
        }
      })
        .then(
          (res) => {
            if (res.data.code == 10000) {
              Toast.show(
                res.data.data.isRegister ? '注册成功' : '登录成功',
                'center',
                2000,
              );
              this.$emit('reload');
              this.close();
            } else {
              Toast.show(res.data.message, 'center', 2000);
            }
          },
          (err) => {
            console.log(err);
          },
        );
    },
    remove(type) {
      this.inputs[type] = '';
    },
    switchLogin() {
      this.passLogin = !this.passLogin;
      if (this.passLogin) {
        this.inputs.vercode = '';
      }
    },
    changePwd() {
      this.eyes = !this.eyes;
    },
  },
  async mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-container {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .modal-mask {
    position: fixed;
    top: 0rem;
    left: 0rem;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
  }

  .modal-box {
    /* display: flex; */
    margin: 0 auto;
    opacity: 1;
    width: 7.106667rem;
    height: 9.933333rem;
    border-radius: 0.04rem;
    background: white;
  }

  .modal-title {
    text-align: center;
    height: 4rem;
    background-image: url(../../img/login/logo.png);
    background-repeat: no-repeat;
    background-position: 2.666667rem 1.493333rem;
    background-size: 2.253333rem auto;
  }

  .modal-inputs {
    height: 1.226667rem;
    line-height: 1.226667rem;
    position: relative;
    width: 5.866667rem;
    margin: 0 auto;
    border-bottom: #dfdfdf 0.013333rem solid;
    background-repeat: no-repeat;
  }

  .modal-inputs-iphone {
    background-image: url(../../img/login/i1.png);
    background-size: 0.52rem auto;
    background-position: left center;
  }

  .modal-inputs-ivcode {
    background-image: url(../../img/login/i2.png);
    background-size: 0.52rem auto;
    background-position: left center;
  }

  .modal-inputs-ipassword {
    background-image: url(../../img/login/i3.png);
    background-size: 0.52rem auto;
    background-position: left center;
  }

  [data-dpr="2"] .modal-inputs-input {
    font-size: 28rpx;
  }

  [data-dpr="3"] .modal-inputs-input {
    font-size: 42rpx;
  }

  [data-dpr="2"] .modal-inputs-vcode {
    font-size: 24rpx;
  }

  [data-dpr="3"] .modal-inputs-vcode {
    font-size: 36rpx;
  }

  input::-webkit-input-placeholder {
    color: #d4d4d4;
  }

  .modal-inputs-input {
    border: none;
    outline: none;
    position: absolute;
    top: 50%;
    transform: translateY(-40%);
    left: 0.733333rem;
    font-size: 14rpx;
    width: 3.893333rem;
  }

  .modal-inputs-vcode {
    background-color: #f37763;
    /* position: absolute; */
    /* right: 0; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    margin-top: 0.266667rem;
    float: right;
    border: none;
    outline: none;
    color: white;
    border-radius: 0.04rem;
    padding: 0.12rem;
    font-size: 12rpx;
  }

  .modal-inputs-vcode[disabled] {
    background-color: #d4d4d4;
  }

  .modal-button {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 22rpx;
  }

  .vertical-center {
      top: 50%;
      transform: translateY(-50%);
      position: relative;
  }

  .modal-control {
    width: 5.866667rem;
    margin: 1rem auto 0;
  }

  .modal-button-login {
    width: 100%;
    height: 1rem;
    background-color: #e45038;
    border: none;
    outline: none;
    border-radius: 0.04rem;
    font-size: 16rpx;
    color: #fff;
  }

  .modal-button-login[disabled] {
    background-color: #ffafa2;
  }

  [data-dpr="2"] .modal-button-login {
    font-size: 32rpx;
  }

  [data-dpr="3"] .modal-button-login {
    font-size: 48rpx;
  }

  .modal-button-close {
    width: 1.066667rem;
    height: 1.066667rem;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(../../img/login/close.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 0.333333rem auto;
  }

  .modal-buttons {
    color: #e45038;
    height: 1.333333rem;
    line-height: 1.6rem;
    text-align: center;
    margin-top: 0.2rem;
    font-size: 13rpx;
    width: 5.866667rem;
    margin: 0 auto;
  }

  [data-dpr="2"] .modal-buttons {
    font-size: 22rpx;
  }

  [data-dpr="3"] .modal-buttons {
    font-size: 36rpx;
  }

  .modal-buttons .col1 {
    float: left;
  }

  .modal-buttons .col2 {
    float: right;
    color: #a6a6a6;
  }

  .eye {
    width: 0.666667rem;
    height: 100%;
    float: right;
    background-position: center;
    background-size: 0.413333rem;
  }

  .cha {
    width: 0.666667rem;
    height: 100%;
    float: right;
    background-position: center;
    background-size: 0.306667rem;
    background-image: url(../../img/login/cha.png);
    background-repeat: no-repeat;
  }

  .icon-yanjing1 {
    background-image: url(../../img/login/icon_yanzheng.png);
    background-repeat: no-repeat;
  }

  .icon-yanjing {
    background-image: url(../../img/login/icon_yanbi.png);
    background-repeat: no-repeat;
  }
</style>
