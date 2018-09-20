<template>
  <div>
    <div class="sur" v-if="lang.lang=='cn'">
      <h2 style="text-align: center;font-size: 20px;font-weight: 600;margin-bottom: 20px;">個人客戶會員協議</h2>
      <div style="line-height: 24px;">
        <!-- <h3 style="font-size: 18px;margin-bottom: 10px;">第一章 通則：</h3> -->
        <p style="margin-bottom: 20px;margin-left: 20px;">1.本人已年滿18歲以上,具有法律能力可於本人所居住的司法權區訂立書面合同，且同意遵守以下具法律約束力的翊豐文件、政策、程序及報酬的條款及條款。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">2.本人不是翊豐國際集團有限公司的員工、法定代表人、特許經營人或代理人。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">3.我所有瞞買的產品是只為了我個人使用。本人不會透過任何其他渠道(如互聯網拍賣站等)，以會員、翊豐或任何其他第三方之名義轉售從翊豐購買的產品。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">4.未獲得批準下,禁止在任何類型的質告中使用翊豐產品，品牌或名稱。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">5.在促產品時必須以誠實,有義務和有責任地提供有關產品價格、品質、排名、功能及存貨信息。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">6.除本合同外,除非以害面形式並由本人及貴公司經授權高級職員簽署，否則概無其他任何形式的承諾、聲明、保證或協議為有效。倘本合同的任何文被證明為不可強制軌行或無效,則除下文的有效性將不受影器。翊豐可保留隨時自行抉定更改任何政策、程序和個人客護協議的權利和權限。在翊豐和個人客護之間完成的任何交易是表示同意並接受當前版本的協議款和條件以及個人客護會員計劃。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">7.本人同意，無論以任何形式作出申索(不論是侵權、合約或是其他)，翊豐、其附屬公司和關屬公司及其高級職員、董事,僱員及代理將不會就任何從屬、附帶、特別或懲罰性賠值(包括針對翊豐的損失利益或任何其他申索)責任。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">8.本人證明,本人在本合同所提供的壹切資料均為準確,並同意若本人提供錯誤或誤導性資料，則翊豐可據擇宣佈本合同自始無效。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">9.翊豐同意根據本合同的條款及條件生產優質產品,並按據報酬潔劃支付傭金。</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">10.本合同由香港法例規管，並按其詮譯。閣下同意不可撤回地願接受香港法院的獨家司法管權管轄,以解抉任何由本合同所引起的申索、爭論或涉及本公司之事宜。有疑的各方須首先發出違規通知，讓另壹方有至少三十(30)天時間作出修正。倘出現爭議，勝訴的壹方將獲補償合理訴訟費及法律費用。</p>
        <!-- <span style="margin-bottom:5px;display: block;font-weight: 600">1 經營商應準守的條款及通用的條件</span>
        <p style="margin-bottom: 20px;margin-left: 20px;">億嘉國際集團有限</p>-->
      </div>
      <a href="javascript:void(0);" @click="agree">我已確認</a>
    </div>
    <div class="sur" v-else>
      <h2 style="text-align: center;font-size: 20px;font-weight: 600;margin-bottom: 20px;">PERSONAL CUSTOMER MEMBERSHIP AGREEMENT</h2>
      <div style="line-height: 24px;">
        <!-- <h3 style="font-size: 18px;margin-bottom: 10px;">第一章 通則：</h3> -->
        <p style="margin-bottom: 20px;margin-left: 20px;">1. I am at least 18 years of age or over, legally competent to enter into a written contract in the junsdiction in which I reside. and agree to abide by the Terms and Conditions of the following binding documents, policies, procedures and compensation plan of Headwind</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">2. I will not represent myself as an employee, legal representative, franchise, or agent of Headwind</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">3. I understand all purchases are intended for my own personal use. I understand that I am prohibited to resell the products purchased for gain, profit, or any other purposes that would imply or be deemed a retail sale</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">4. Without approved permission from Headwind. I understand that this agreement forbids the use of the Headwind products, brand or name to be used by my in any types of advertisements</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">5. I understand that when presenting descriptions of Headwind products and programs I must present in a honest and complete manner, and will not make any daims of the products that are untruthful and not contained in the official Headwind handbook. I will observe the highest standard of integrity, honesty, and responsibility when dealing with others</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">6. Other than this Agreement, no other promises, representations, guarantees or agreements of any kind shall be valid unless in writing and signed by both me and an authorized officer of the Company. If any provision of this Agreement is found to be unenforceable or invalid, the validity of the remaining provisions shall not be affected. Headwind reserves the nght and authority to change any of the policies and procedures, and/or the Personal Customer agreement at any time, and at its sole discretion. Any transaction completed between Headwind and the Personal Customer indicates agreement with, and acceptance of, the current version of the Agreement Terms and Conditions or the Personal Customer Membership Program.</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">7. I agree that regardless of the form af claim, whether in tort, contract or other, Headwind. its subsidiaries and affiliated companies and their officers, directors, employees, and agents shall not be liable for any consequential, incidental, special or punitive damages against Headwind</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">8. I certify the accuracy of all information provided by me in this Agreement and agree that the providing of false or misleading information authorizes Headwind. at its election, to declare this Agreement void from its inception</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">9. Headwind agrees to manufacture quality products available under the terms and conditions of the Agreement and pay commissions according to the Compensation Plan</p>
        <p style="margin-bottom: 20px;margin-left: 20px;">10. This contract shall be govemed by and construed in accordance to the laws of Hong Kong. I agree to irrevocably submit to the exclusive jurisdiction of the courts of Hong Kong to resolve any claim or controversy arising out of the Contract or that otherwise concems the Company. Each part having a concem shall first give notice of the offense and allow at last thirty(30) days for the other part to cure. In the event of a dispute, the prevailing party shall be reimbursed its reasonable costs and legal fees.</p>
      </div>
      <a href="javascript:void(0);" @click="agree">I have confirmed</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "agreement",
    data() {
      const global = this.global,
        collapseAttr = global.collapseAttr,
        lang = global.lang,
        langJson = global.langJson.password,
        userInfo = global.userInfo;
      langJson.lang = lang;
      return{
        lang: langJson,
      };
    },
    methods: {
      agree(){
        this.api(this, '/user/agree', '', res => {
          this.global.userInfo.agreement = 1;
          this.global.updateUserInfo(this.global.userInfo);
          if(this.global.userInfo.activate==0||this.global.userInfo.activate==1)
            this.$router.push("activate");
          else
            this.$router.push("index");
        });
      }
    },
    mounted() {
      
    },
    created(){
      this.$root.$on("selectLang",res=>{
        this.lang.lang = res;
      })
    }
  }
</script>

<style scoped>
.sur{
  margin-top: 10px;
  width: 1200px;
  margin: 10px auto 30px;
  background: #fff;
  padding: 25px;
  box-sizing: border-box;
  /* max-height: 600px; */
  overflow: auto;
}
.sur a{
  display: block;
  text-align: center;
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  text-decoration: none;
  background: #494232;
  color: #fff;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 20px;
}
</style>
