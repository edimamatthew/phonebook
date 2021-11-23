import { createStore } from "vuex";
let endpoint = "http://localhost:4000/phonebook/";

export default createStore({
  state: ()=> ({
    contacts: [],
    createContact: {
      emailAddress: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      id: 0
    },
    showContact: false,
    errors: {}
  }) ,
  mutations: {
    toggleContactModal(state) {
      state.showContact = !state.showContact
    },
    showContactModal(state){
      state.showContact = true;
    },
    hideContactModal(state){
      state.showContact = false;
    },
    setContact(state,json){
      state.contacts = json
    },
    clearContactForm(state, json){
      state.createContact = {
        emailAddress: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        id: 0
      }
    },
    setError(state,data){
      state.errors = data
    },
    updatePhoneNumber(state, value){
      state.createContact.phoneNumber = value
    },
    updateEmailAddress(state, value){
      state.createContact.emailAddress = value
    },
    updateFirstName(state, value){
      state.createContact.firstName = value
    },
    updateLastName(state, value){
      state.createContact.lastName = value
    },
    updateContactId(state, value){
      state.createContact.id = value
    },
    
  },
  getters: {
    shouldShowContactModal(state){
      return state.showContact
    },
  },
  actions: {
    async getContactData (context) {
      let resp = await fetch(endpoint)
      let json = await resp.json()
      context.commit("setContact",json)  
    },
    async createContact (context) {
      let err = validate(context.state)

      if(Object.keys(err).length>=1){
        context.commit("setError",err)
        return false
      }

      try{
      let resp = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(context.state.createContact),
        headers: {
          "Content-Type": "application/json"
        }
      })
      let json = await resp.json()
      context.commit("setContact",json)
      context.dispatch("getContactData");
      return true;
    }catch(e){
      this.$toast.open({
        message: 'An error occured',
        type: 'error'
      });
    }
    return false
  },
  editContact(context, contactId){
    let cc = context.state.contacts[contactId]
    context.commit("setError",{})
    if(cc){
      context.commit("updateEmailAddress", cc.emailAddress)
      context.commit("updatePhoneNumber", cc.phoneNumber)
      context.commit("updateFirstName", cc.firstName)
      context.commit("updateLastName", cc.lastName)
      context.commit("updateContactId", cc.id)
    }
  },
  async updateContact (context, contactId) {
    let err = validate(context.state)
    

    if(Object.keys(err).length>=1){
      context.commit("setError",err)
      return false
    }

    let data = {
      firstName: this.state.createContact.firstName,
      lastName: this.state.createContact.lastName,
      phoneNumber: this.state.createContact.phoneNumber,
      emailAddress: this.state.createContact.emailAddress,
    }
    try{
      let resp = await fetch(endpoint + contactId, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      let json = await resp.json()
      context.commit("setContact",json)
      context.commit("clearContactForm")
        return true
      } catch (e) {
        this.$toast.open({
          message: 'An error occured',
          type: 'error'
        });
      }
    },
    async deleteContact (context, contactId) {
      let resp = await fetch(endpoint + contactId, {
        method: "DELETE",
      })
      let json = await resp.json()
      context.commit("setContact",json)
    },
  },
  modules: {},
});


function validate(state){
  let email = state.createContact.emailAddress
  let phone = state.createContact.phoneNumber
  let firstName = state.createContact.firstName
  let lastName = state.createContact.lastName
  let ee: {[prop:string]:string} = {}

  if(!email || !validateEmail(email)){
    ee.email = "Invalid Email Supplied"
  }

  if(!phone){
    ee.phone = "Phone Number is required"
  }

  if(!firstName || !lastName){
    ee.phone = "Enter at least the first or last name"
  }

  return ee
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}