const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const publisher = pubSubClient.topic("projects/crested-axe-227312/topics/shopping-list-event", {});
const allowedOrigins = ['http://localhost:3000', 'http://storage.googleapis.com'];

exports.deleteAllItems = async (req, res) => {

    if (allowedOrigins.find(e => e === req.headers.origin)) {
        res.set('Access-Control-Allow-Origin', req.headers.origin);
    }

    const response = await deleteCollection(db, "shopping-items", 10);

    await publishMessage(JSON.stringify({
        event: 'ALL_ITEMS_DELETED_FROM_SHOPPING_LIST',
        date: Date.now()
    }));

    res.send(response);
};



async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('id').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

async function publishMessage(message) {
    const dataBuffer = Buffer.from(message);
    const messageId = await publisher.publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}