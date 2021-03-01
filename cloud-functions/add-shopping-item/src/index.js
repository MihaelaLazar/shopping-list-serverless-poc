const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const publisher = pubSubClient.topic("projects/crested-axe-227312/topics/shopping-list-event", {});
const allowedOrigins = ['http://localhost:3000', 'http://storage.googleapis.com'];

exports.addShoppingItem = async (req, res) => {

    if (allowedOrigins.find(e => e === req.headers.origin)) {
        res.set('Access-Control-Allow-Origin', req.headers.origin);
    }
    // if (req.method === 'OPTIONS') {
    //     res.set('Access-Control-Allow-Methods', 'GET');
    //     res.set('Access-Control-Allow-Headers', 'Content-Type');
    //     res.set('Access-Control-Max-Age', '3600');
    //     res.status(204).send('');
    // } else {
    const shoppingItemToAdd = req.body;
    let eventToCreate = '';

    const shoppingItemsCollection = db.collection('shopping-items');
    const snapshot = await shoppingItemsCollection.where('id', '==', shoppingItemToAdd.id).get();

    if (snapshot.empty) {
        console.log('Item does not exist. Will create one ...');
        eventToCreate = 'ITEM_ADDED_TO_SHOPPING_LIST'
    } else {
        eventToCreate = 'ITEM_UPDATED'
    }


    const docRef = shoppingItemsCollection.doc(shoppingItemToAdd.id);
    await docRef.set({
            id: shoppingItemToAdd.id,
            inBasket: shoppingItemToAdd.inBasket,
            name: shoppingItemToAdd.name
        });

    await publishMessage(JSON.stringify({
        event: eventToCreate,
        date: Date.now()
    }));
    res.send({});
    // }
}

async function publishMessage(message) {
    const dataBuffer = Buffer.from(message);
    const messageId = await publisher.publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}