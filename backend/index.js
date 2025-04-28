require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const adminController = require('./controllers/adminController');
const collabCartRoutes = require('./routes/collabCartRoutes.js');
const deliveryRoutes = require('./routes/deliveryRoutes.js');
const admin = require("firebase-admin");
const User = require("./ models/User.js");
var serviceAccount = require("./serviceAccountKey.json");
// const syncUsers = require('./syncUsers.js');
// const usersSync = require('./usersSync.js');
app.use(cors({ origin: '*' }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  codePrefix: 'app',
});

const db = admin.firestore();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";
console.log(process.env.MONGO_URL)
mongoose.connect(mongoUrl);
console.log("Connected to MongoDB");    

app.get("/admin/users", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();

    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the document data
    }));
    res.json(users);

    console.log("Fetched users:", users);
  } catch (error) {

    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});


//BEFORE THAT YOU NEED TO ADD ALL THE AUTH USERS FROM FIREBASE AUTH TO FIRESTORE
// Sync users from Firestore to MongoDB
// RUN: node syncUsers.js
// This function will sync users from Firestore to MongoDB every 1 second
// or you can do this 

// Run syncUsers when the server starts
// syncUsers(); // Call the function here
// usersSync();
const syncUsersToMongoDB = async () => {
  try {
    console.log("Syncing users from Firestore to MongoDB...");

    // Fetch users from Firestore
    const usersSnapshot = await db.collection("users").get();
    const firestoreUsers = usersSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));
    console.log("Firestore users:", firestoreUsers);
    for (const firestoreUser of firestoreUsers) {
      // Convert Firestore Timestamp to JS Date if needed
      let createdAt = new Date();
      if (firestoreUser.createdAt && firestoreUser.createdAt.toDate) {
        createdAt = firestoreUser.createdAt.toDate();
      } else if (firestoreUser.createdAt && firestoreUser.createdAt._seconds) {
        createdAt = new Date(firestoreUser.createdAt._seconds * 1000);
      }
    
      const existingUser = await User.findOne({ uid: firestoreUser.uid });
    
      if (!existingUser) {
        await User.create({
          uid: firestoreUser.uid,
          email: firestoreUser.email,
          createdAt, // Use the converted date
        });
        console.log(`Added user to MongoDB: ${firestoreUser.email}`);
      } else {
        continue;
      }
    }
    console.log("User sync complete!");
  } catch (error) {
    console.error("Error syncing users:", error);
  }
};

setInterval(syncUsersToMongoDB, 60000000);

// Optionally, call it once when the server starts
syncUsersToMongoDB();

app.use('/admin', adminController); 
app.use("/delivery", deliveryRoutes);
app.use('/api', collabCartRoutes);
app.listen(5001, () => {
    console.log(`Backend is running on port 5001`);
});
  