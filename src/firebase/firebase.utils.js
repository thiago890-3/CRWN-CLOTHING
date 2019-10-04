import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAHTyuI_cF0SauZu6ijhfuFR8m_n4TCGwg",
    authDomain: "crwn-db-501e6.firebaseapp.com",
    databaseURL: "https://crwn-db-501e6.firebaseio.com",
    projectId: "crwn-db-501e6",
    storageBucket: "",
    messagingSenderId: "13782069915",
    appId: "1:13782069915:web:0d3a41d6e8719b41b04c3e",
    measurementId: "G-0PZJ1LXKTJ"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

