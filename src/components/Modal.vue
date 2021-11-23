<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3><slot name="header"></slot></h3>
          </div>

          <div class="modal-body">
            <div
              class="alert-danger"
              v-if="Object.keys($store.state.errors).length > 0"
            >
              <div
                class="error"
                v-for="error in $store.state.errors"
                :key="error"
              >
                {{ error }}
              </div>
            </div>
            <slot name="body">
              <form id="create-contact" v-on:submit.prevent>
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone number * </label>
                  <input
                    type="phone"
                    class="form-control"
                    id="phone"
                    v-model="phoneNumber"
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address *</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="emailAddress"
                  />
                </div>
                <div class="mb-3">
                  <label for="firstname" class="form-label">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    v-model="firstName"
                  />
                </div>
                <div class="mb-3">
                  <label for="lastname" class="form-label">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    v-model="lastName"
                  />
                </div>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn space-right-5" @click="$emit('closeModal')">
                Close
              </button>
              <slot name="submitButton">BTN TO CLICK</slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    phoneNumber: {
      get() {
        return this.$store.state.contactData.phoneNumber
      },
      set(value) {
        this.$store.commit("updatePhoneNumber", value)
      },
    },
    emailAddress: {
      get() {
        return this.$store.state.contactData.emailAddress
      },
      set(value) {
        this.$store.commit("updateEmailAddress", value)
      },
    },
    firstName: {
      get() {
        return this.$store.state.contactData.firstName
      },
      set(value) {
        this.$store.commit("updateFirstName", value)
      },
    },
    lastName: {
      get() {
        return this.$store.state.contactData.lastName
      },
      set(value) {
        this.$store.commit("updateLastName", value)
      },
    },
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
@media only screen and (min-width: 769px) {
  .modal-container {
    width: 30%;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.mb-3 {
  margin-bottom: 1rem !important;
}
.form-label {
  margin-bottom: 0.5rem;
}
label {
  display: inline-block;
}
.form-control {
  display: block;
  width: 100%;
  padding: 10px 10px;
  font-size: 13px;
  box-sizing: border-box;
  color: #212529;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
