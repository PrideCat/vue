import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: r => require(["src/components/auth/login"], r)
    }, {
      path: '/user/:id',
      name: 'user',
      component: r => require(["src/components/user/user"], r),
      children: [
        {path: '/user/index', name: 'index', component: r => require(["src/components/user/index"], r)},
        {path: '/user/register', name: 'register', component: r => require(["src/components/user/register"], r)},
        {path: '/user/registerSet', name: 'registerSet', component: r => require(["src/components/user/registerSet"], r)},
        {path: '/user/bankSet', name: 'bankSet', component: r => require(["src/components/user/bankSet"], r)},
        {path: '/user/consumersRegister', name: 'consumersRegister', component: r => require(["src/components/user/consumersRegister"], r)},
        {path: '/user/registers', name: 'registers', component: r => require(["src/components/user/registers"], r)},
        {path: '/user/consumerInquiry', name: 'consumerInquiry', component: r => require(["src/components/user/consumerInquiry"], r)},
        {path: '/user/modify', name: 'modify', component: r => require(["src/components/user/modify"], r)},
        {path: '/user/password', name: 'password', component: r => require(["src/components/user/password"], r)},
        {path: '/user/paymentPassword', name: 'paymentPassword', component: r => require(["src/components/user/paymentPassword"], r)},
        {path: '/user/addresses', name: 'addresses', component: r => require(["src/components/user/addresses"], r)},
        {path: '/user/referees', name: 'referees', component: r => require(["src/components/user/referees"], r)},
        {path: '/user/sendees', name: 'sendees', component: r => require(["src/components/user/sendees"], r)},
        {path: '/user/wallet', name: 'wallet', component: r => require(["src/components/user/wallet"], r)},
        {path: '/user/recharge', name: 'recharge', component: r => require(["src/components/user/recharge"], r)},
        {path: '/user/withdrawals', name: 'withdrawals', component: r => require(["src/components/user/withdrawals"], r)},
        {path: '/user/transfers', name: 'transfers', component: r => require(["src/components/user/transfers"], r)},
        {path: '/user/retrive', name: 'retrive', component: r => require(["src/components/user/retrive"], r)},
        {path: '/user/order', name: 'order', component: r => require(["src/components/user/order"], r)},
        {path: '/user/announce', name: 'announce', component: r => require(["src/components/user/announce"], r)},
        {path: '/manager/userRetrive', name: 'userRetrive', component: r => require(["src/components/user/userRetrive"], r)},
        {path: '/manager/rechargeRetrive', name: 'rechargeRetrive', component: r => require(["src/components/user/rechargeRetrive"], r)},
        {path: '/manager/withdrawalsRetrive', name: 'withdrawalsRetrive', component: r => require(["src/components/user/withdrawalsRetrive"], r)},
        {path: '/manager/announceRetrive', name: 'managerAnnounce', component: r => require(["src/components/user/managerAnnounce"], r)},
        {path: '/manager/genreRetrive', name: 'genreRetrive', component: r => require(["src/components/user/genreRetrive"], r)},
        {path: '/manager/commodityRetrive', name: 'commodityRetrive', component: r => require(["src/components/user/commodityRetrive"], r)},
        {path: '/manager/commodityDetailRetrive', name: 'commodityDetailRetrive', component: r => require(["src/components/user/commodityDetailRetrive"], r)},
        {path: '/manager/commodityOrderRetrive', name: 'commodityOrderRetrive', component: r => require(["src/components/user/commodityOrderRetrive"], r)},
        {path: '/manager/companyMsg', name: 'companyMsg', component: r => require(["src/components/user/companyMsg"], r)},
        {path: '/manager/managerNewsRetrive', name: 'managerNewsRetrive', component: r => require(["src/components/user/managerNewsRetrive"], r)},
        {path: '/manager/questionRetrive', name: 'questionRetrive', component: r => require(["src/components/user/questionRetrive"], r)},
        {path: '/user/agreement', name: 'agreement', components:{agree:r => require(["src/components/user/agreement"], r)}},
        {path: '/user/forgetPassword', name: 'forgetPassword', components:{forgetPassword:r => require(["src/components/user/forgetPassword"], r)}},
        {path: '/user/activate', name: 'activate', component: r => require(["src/components/user/activate"], r)}
      ]
    },{
      path: '/user/password/notify',
      name: 'notify',
      component: r => require(["src/components/auth/notify"], r)
    }
  ]
});
