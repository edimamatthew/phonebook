import { createStore } from "vuex";
const endpoint = "http://localhost:4000/phonebook/";

export default createStore({
  state: ()=> ({
    contacts: [],
    contactData: {
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
      state.contactData = {
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
      state.contactData.phoneNumber = value
    },
    updateEmailAddress(state, value){
      state.contactData.emailAddress = value
    },
    updateFirstName(state, value){
      state.contactData.firstName = value
    },
    updateLastName(state, value){
      state.contactData.lastName = value
    },
    updateContactId(state, value){
      state.contactData.id = value
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
        body: JSON.stringify(context.state.contactData),
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
      firstName: this.state.contactData.firstName,
      lastName: this.state.contactData.lastName,
      phoneNumber: this.state.contactData.phoneNumber,
      emailAddress: this.state.contactData.emailAddress,
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
});


function validate(state){
  let email = state.contactData.emailAddress
  let phone = state.contactData.phoneNumber
  let firstName = state.contactData.firstName
  let lastName = state.contactData.lastName
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
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true
  }
  return false
}