<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>ChatGPT</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <form @submit.prevent="sendMessage">
      <ion-item>
        <ion-input v-model="message" placeholder="Enter a message" required></ion-input>
      </ion-item>
      <ion-button expand="block" type="submit" :disabled="isSendingMessage">
        {{ isSendingMessage ? 'Sending...' : 'Send' }}
      </ion-button>
    </form>

    <ion-list>
      <ion-item v-for="message in messages" :key="message.id">
        <ion-label>{{ message.text }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      message: '',
      messages: [],
      isSendingMessage: false,
    };
  },
  methods: {
    async sendMessage() {
      this.isSendingMessage = true;
      try {
        const response = await axios.post('http://localhost:3000/message', { message: this.message });
        this.messages.push({ id: Date.now(), text: response.data.response });
        this.message = '';
      } catch (error) {
        console.error(error);
      } finally {
        this.isSendingMessage = false;
      }
    },
  },
};
</script>
