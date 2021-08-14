import firebase from 'firebase/app'
import  'firebase/auth'
import  'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAGyiLi1kLmDrsakadyT7tKmBLbTZiRXdY",
  authDomain: "todo-list-vue-157b2.firebaseapp.com",
  projectId: "todo-list-vue-157b2",
  storageBucket: "todo-list-vue-157b2.appspot.com",
  messagingSenderId: "411403022990",
  appId: "1:411403022990:web:f0d5a196e90ddd7fbc8fdf"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const taskCollection = db.collection('tasks')

export {
  db, auth, profileCollection ,taskCollection
}