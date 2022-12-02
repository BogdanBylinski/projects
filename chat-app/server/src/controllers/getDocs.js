const admin = require("../config/firebase.config");

async function getUsersByIds(ids) {
  let users = [];
  const limit = 10;

  while (ids.length) {
    const db = admin.firestore();
    const res = await db
      .collection("users")
      .where("uid", "==", ids[0].trim())
      .get();
    const _users = res.docs.map((doc) => {
      const _data = doc.data();
      _data.docId = doc.id;
      return _data;
    });

    users.push(..._users);
    ids.shift();
  }
  //   console.log(users);
  return users;
}
module.exports = getUsersByIds;
