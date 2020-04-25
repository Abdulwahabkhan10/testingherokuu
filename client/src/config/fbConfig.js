import * as firebase from 'firebase/app';
import 'firebase/storage';

// Replace this with your own config details
var config = {
  apiKey: 'AIzaSyAima_EdW3PL4gBHH_4Tq3Z-9glSh9BefU',
  authDomain: 'deployeee.firebaseapp.com',
  databaseURL: 'https://deployeee.firebaseio.com',
  projectId: 'deployeee',
  storageBucket: 'deployeee.appspot.com',
  messagingSenderId: '1067353547283',
  appId: '1:1067353547283:web:13a47a3dd65f025d60d5e6',
};
firebase.initializeApp(config);

export default firebase;
