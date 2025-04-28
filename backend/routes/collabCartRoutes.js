// filepath: /Users/dhruvpatel/Projects/amazon-clone/backend/routes/collabCartRoutes.js
const express = require('express');
const { createOrUpdateCollabCart, getCollabCart, getSharedCollabCart } = require('../controllers/collabCartController');
const router = express.Router();

router.post('/collabCart', createOrUpdateCollabCart);
router.get('/collabCart/:cartId', getCollabCart);
router.get('/collabCart/shared/:currentUser/:selectedUser', getSharedCollabCart); 

module.exports = router;