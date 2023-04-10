<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Secure message</h5>
          <div class="mb-3">
            <label for="message-password" class="form-label">Decrypt password</label>
            <input :disabled="!active" type="password" v-model="messagePassword" class="form-control"
                   id="message-password">
          </div>
          <div class="mb-3">
            <button :disabled="!active" type="button" @click="load" class="btn btn-dark">Show</button>
          </div>
<!--          <div>{{ encryptedMessage }}</div>-->
          <div class="mb-3" v-if="message !== null">
            {{ message }}
            <div class="text-danger" v-if="message.length === 0">
              Invalid password
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
  name: "ReadMessage",
  data: function () {
    return {
      loaded: false,
      code: null,
      encryptedMessage: null,
      message: null,
      messagePassword: "",
      found: null,
    }
  },
  computed: {
    active() {
      return !this.loaded
    },
    // decryptedMessage() {
    //   if (this.active || this.encryptedMessage === null) {
    //     return null
    //   }
    //   return this.decrypt(this.messageText, this.password).toString()
    // },
  },
  created() {
    this.code = this.$route.params.code
  },
  methods: {
    load() {
      fetch(`/Message/Read/${this.code}`,)
          .then(r => r.json())
          .then(data => {
            console.log(data)
            this.found = data.found
            this.loaded = true
            if (data.found) {
              this.encryptedMessage = data.encryptedText
              this.message = this.decrypt(this.encryptedMessage, this.messagePassword)
            } else {
              this.encryptedMessage = null
              this.message = ""
            }
          })
          .catch(er => console.error(er))
    },
    decrypt(text, password) {
      return CryptoJS.AES.decrypt(text, password).toString(CryptoJS.enc.Utf8)
    },
  }
}
</script>

<style scoped>

</style>