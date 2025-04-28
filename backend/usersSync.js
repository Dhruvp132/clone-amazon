const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Your Firebase Admin SDK key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  codePrefix: 'app2'
});

const auth = admin.auth();
const db = admin.firestore();

const syncUsers = async () => {
  try {
    let nextPageToken;
    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      for (const user of listUsersResult.users) {
        const userRef = db.collection("users").doc(user.uid);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          await userRef.set({
            uid: user.uid,
            email: user.email,
            createdAt: user.metadata.creationTime,
          });
          console.log(`Added user: ${user.email}`);
        } else {
          console.log(`User already exists: ${user.email}`);
        }
      }
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    console.log("User sync complete!");
  } catch (error) {
    console.error("Error syncing users:", error);
  }
};

syncUsers();

module.exports = syncUsers;