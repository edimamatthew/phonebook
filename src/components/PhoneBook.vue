<template>
  <div>
    <table v-if="Object.keys($store.state.contacts).length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in $store.state.contacts" :key="contact.id">
          <td data-column="ID">{{ contact.id }}</td>
          <td data-column="Phone number">{{ contact.phoneNumber }}</td>
          <td data-column="Email">{{ contact.emailAddress }}</td>
          <td data-column="First name">{{ contact.firstName }}</td>
          <td data-column="Last name">{{ contact.lastName }}</td>
          <td data-column="Actions" class="contact-options">
            <button @click="editContact(contact.id)">
              <svg
                class="binIcon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
                ></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </button>

            <button @click="deleteContact(contact.id)">
              <svg
                class="binIcon"
                x="0px"
                y="0px"
                viewBox="0 0 32 32"
                style="enable-background: new 0 0 32 32"
                xml:space="preserve"
              >
                <path
                  class="st0"
                  d="M20,9h-8V7c0-2.2,1.8-4,4-4h0c2.2,0,4,1.8,4,4V9z"
                />
                <path
                  class="st0"
                  d="M8,14v13c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V14h2v-3c0-1.1-0.9-2-2-2H8c-1.1,0-2,0.9-2,2v3h18"
                />
                <line class="st0" x1="13" y1="19" x2="13" y2="24" />
                <line class="st0" x1="19" y1="19" x2="19" y2="24" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="no-contact">No Contact Found.</div>
    </div>

    <Modal v-if="showEditForm" v-on:closeModal="showEditForm = false">
      <template v-slot:header> Update a Contact </template>

      <template v-slot:submitButton>
        <button v-on:click="submitUpdateContact(id)" class="btn btn-dark">
          Update Contact
        </button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue"
export default {
  components: { Modal },
  data: () => ({
    showEditForm: false,
  }),
  mounted() {
    this.$store.dispatch("getContactData")
  },
  computed: {
    id: {
      get() {
        return this.$store.state.contactData.id
      },
      set(value) {
        this.$store.commit("updateContactId", value)
      },
    },
  },
  methods: {
    editContact(contactId) {
      this.$store.dispatch("editContact", contactId)
      this.showEditForm = true
    },
    submitUpdateContact(contactId) {
      this.$store.dispatch("updateContact", contactId).then((status) => {
        console.log(status)
        if (status === true) {
          this.showEditForm = false
          this.$toast.open({
            message: "Successfully updated",
            type: "success",
          })
        }
      })
    },
    deleteContact(contactId) {
      if (confirm("Do you really want to delete?")) {
        this.$store.dispatch("deleteContact", contactId).then((status) => {
          if (status === true) {
            this.$toast.open({
              message: "Successfully deleted",
              type: "success",
            })
          }
        })
      }
    },
  },
}
</script>

<style scoped>
.st0 {
  fill: none;
  stroke: #000000;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
.binIcon {
  width: 18px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 50px;
}
tr:nth-of-type(odd) {
  background: #eee;
}
th {
  background: #777;
  color: white;
}
td,
th {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table {
    width: 100%;
  }
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-column);
    color: #000;
  }
}
.contact-options button {
  border: 0;
  cursor: pointer;
  background: transparent;
}
.contact-options button:first-child {
  margin-right: 8px;
}
.no-contact {
  text-align: center;
  margin: 100px 0;
}
</style>
