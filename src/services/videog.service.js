import firebase from "../firebase";

const db = firebase.collection("/videog");

class VideogDataService {
  getAll() {
    return db;
  }

  create(videog) {
    return db.add(videog);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new VideogDataService();