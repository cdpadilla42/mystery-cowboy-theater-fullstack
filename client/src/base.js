import Rebase from 're-base';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAH5UaXLUT_mhRuY8eALKor1sBlWliHbm8',
  authDomain: 'mystery-cowboy-theater.firebaseapp.com',
  databaseURL: 'https://mystery-cowboy-theater.firebaseio.com',
  projectId: 'mystery-cowboy-theater',
  storageBucket: 'mystery-cowboy-theater.appspot.com',
  messagingSenderId: '690314762390',
  appId: '1:690314762390:web:842d7e63c64f2775eb8ab7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
