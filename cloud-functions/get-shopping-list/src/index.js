const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const publisher = pubSubClient.topic("projects/crested-axe-227312/topics/shopping-list-event", {});
const allowedOrigins = ['http://localhost:3000', 'http://storage.googleapis.com'];

exports.getShoppingList = async (req, res) => {
    if (allowedOrigins.find(e => e === req.headers.origin)) {
        res.set('Access-Control-Allow-Origin', req.headers.origin);
    }

    // if (req.method === 'OPTIONS') {
    //     res.set('Access-Control-Allow-Methods', 'GET');
    //     res.set('Access-Control-Allow-Headers', 'Content-Type');
    //     res.set('Access-Control-Max-Age', '3600');
    //     res.status(204).send('');
    // } else {
    const shoppingItems = [];
    const snapshot = await db.collection('shopping-items').get();
    snapshot.forEach((doc) => {
        shoppingItems.push(doc.data());
    });

    await publishMessage(JSON.stringify({
        event: 'ITEMS_RETRIEVED_FROM_SHOPPING_LIST',
        date: Date.now()
    }));

    res.send(shoppingItems);
    // }
};

async function publishMessage(message) {
    const dataBuffer = Buffer.from(message);
    const messageId = await publisher.publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}