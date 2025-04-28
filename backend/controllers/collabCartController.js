const CollabCart = require("../ models/CollabCart");

const createOrUpdateCollabCart = async (req, res) => {
    const { cartId, userEmail, products } = req.body;

    try {
        let collabCart = await CollabCart.findOne({ cartId });

        if (!collabCart) {
            collabCart = new CollabCart({
                cartId,
                users: userEmail,
                products: products.map(product => ({ ...product, addedBy: userEmail[0] })),
            });
        } else {
            // Add user if not already in the collab
            if (!collabCart.users.includes(userEmail)) {
                collabCart.users.push(userEmail);
            }

            // Add products
            products.forEach(product => {
                collabCart.products.push({ ...product, addedBy: userEmail[0] });
            });
        }

        await collabCart.save();
        res.status(200).json({ msg: 'Collab cart updated successfully', collabCart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getCollabCart = async (req, res) => {
    const { cartId } = req.params;

    try {
        const collabCart = await CollabCart.findOne({ cartId });
        if (!collabCart) {
            return res.status(404).json({ msg: 'Collab cart not found' });
        }
        res.status(200).json(collabCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getSharedCollabCart = async (req, res) => {
    const { currentUser, selectedUser } = req.params;

    try {
        // Find carts where both users are present
        const sharedCarts = await CollabCart.find({
            users: { $all: [currentUser, selectedUser] },
        });

        if (!sharedCarts.length) {
            return res.status(404).json({ msg: 'No shared collab carts found' });
        }

        res.status(200).json(sharedCarts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = { createOrUpdateCollabCart, getCollabCart, getSharedCollabCart };
