<template>
  <div class="wrapper">
    <div class="header">
      <h1>Phonebook Directory</h1>
    </div>
    <div class="create-new">
      <button class="btn btn-dark" @click="handleContactClick">
        Create a New Contact
      </button>
    </div>

    <PhoneBook />
    <CreatePhone
      :showContactModal="showContactModal"
      @hideContactModal="showContactModal = false"
    />
  </div>
</template>

<script lang="ts">
import PhoneBook from "./components/PhoneBook.vue"
import CreatePhone from "./components/CreatePhone.vue"
import Modal from "./components/Modal.vue"

export default {
  components: {
    PhoneBook,
    CreatePhone,
  },
  data: () => ({
    showContactModal: false,
  }),
  methods: {
    handleContactClick() {
      this.$store.commit("setError", {})
      this.$store.commit("clearContactForm", {})
      this.showContactModal = true
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
h1 {
  font-weight: 900;
}
html {
  font-family: "Nunito", sans-serif;
}
#app {
  font-size: 15px;
  color: #333;
}
.wrapper {
  margin: 0 20px;
}
@media only screen and (min-width: 769px) {
  .wrapper {
    margin: 0 7%;
  }
}
.header {
  text-align: center;
  padding: 25px 0;
}
.create-new {
  margin-bottom: 25px;
  text-align: right;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  border-radius: 0.25rem;
}
.btn:hover {
  opacity: 0.8;
}
.btn-dark {
  background: #212529;
  color: #fff;
}
.space-right-5 {
  margin-right: 5px;
}
.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
