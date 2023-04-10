<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Secure message HOME </h5>
          <div class="mb-3">
            <label for="message-text" class="form-label">Input message</label>
            <textarea :disabled="!active"  class="form-control" v-model="messageText" id="message-text" rows="5"></textarea>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Encrypt password</label>
            <input :disabled="!active" type="password" v-model="password" class="form-control" id="password">
          </div>
          <button :disabled="!active" type="button" @click="saveMessage" class="btn btn-dark">Encrypt & Save</button>
        </div>
        <div v-if="saved">
          <div class="text-success">Message saved</div>
          <a :href="messageUrl">{{messageUrl}}</a>
        </div>
<!--        <div>{{encryptedMessage}}</div>-->
      </div>
    </div>
  </div>
</template>

<script lang="js">
import CryptoJS from 'crypto-js'

export default {
  data: function () {
    return {
      messageText: "",
      password: "",
      active: true,
      saved: false,
      code: null,
      messageUrl: null,
    }
  },
  created() {

  },
  computed: {
    encryptedMessage() {
      return this.encrypt(this.messageText, this.password).toString()
    },
  },

  methods: {
    encrypt(text, password) {
      return CryptoJS.AES.encrypt(text, password)
    },
    saveMessage() {
      this.active = false
      let component = this

      fetch("/Message/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "encryptedText": component.encryptedMessage
        })
      }).then(r => r.json())
          .then(data => {
            console.log(data)
            component.saved = true
            component.code = data.code
            component.messageUrl = location.protocol + '//' + location.host + `/read/${data.code}`
          }).catch(err => console.error(err))
    }
  },

};
</script>