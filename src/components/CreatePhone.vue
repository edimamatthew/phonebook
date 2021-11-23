<template>
  <div class="wrapper">
    <Modal v-if="showContactForm" v-on:closeModal="$emit('hideContactModal')">
      <template v-slot:header>Create a Contact</template>

      <template v-slot:submitButton>
        <button v-on:click="submitCreateContact" class="btn btn-dark">
          Create Contact
        </button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Modal from "./Modal.vue"

export default {
  components: { Modal },
  props: ["showContactForm"],

  methods: {
    submitCreateContact() {
      this.$store.dispatch("createContact").then((status) => {
        if (status === true) {
          this.$emit("hideContactModal")
          this.$toast.open({
            message: "Successfully created",
            type: "success",
          })
        }
      })
    },
  },
}
</script>
