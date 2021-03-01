const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const publisher = pubSubClient.topic("projects/crested-axe-227312/topics/shopping-list-event", {});
const allowedOrigins = ['http://localhost:3000', 'http://storage.googleapis.com'];

exports.deleteShoppingItem = async (req, res) => {
    if (allowedOrigins.find(e => e === req.headers.origin)) {
        res.set('Access-Control-Allow-Origin', req.headers.origin);
    }

    const shoppingItemToDelete = req.body;
    const response = await db.collection('shopping-items').doc(shoppingItemToDelete.id).delete();

    await publishMessage(JSON.stringify({
        event: 'ITEM_DELETED_FROM_SHOPPING_LIST',
        date: Date.now()
    }));

    res.send(response);
};

async function publishMessage(message) {
    const dataBuffer = Buffer.from(message);
    const messageId = await publisher.publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}