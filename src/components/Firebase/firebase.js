import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** User API ***

  selectLessons = () => this.db.ref("lessons");

  selectLessonsByUser = (uid) => this.db.ref(`lessons/${uid}`);

  selectLesson = (path) => this.db.ref(`lessons/${path}`);

  selectReservedLessons = (uid) => this.db.ref(`reserved-lessons/${uid}`);

  selectReservedLesson = (uid, lesson_id) =>
    this.db.ref(`reserved-lessons/${uid}/${lesson_id}`);
}

export default Firebase;
