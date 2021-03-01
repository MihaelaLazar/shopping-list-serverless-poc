const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
const subscriptionName = "shopping-list-event";
const timeout = 60;

exports.createReport = async (req,res) => {
    const nowDate = Date.now()
    try {
        await listenForPullMessages(pubSubClient, subscriptionName, timeout, nowDate);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't receive orders object",
            data: error
        })
    }
    res.send({});
}

const listenForPullMessages = async (pubSubClient, subscriptionName, timeout, nowDate) => {
    const subscription = pubSubClient.subscription(subscriptionName);
    let updateEvents = 0;
    let deleteEvents = 0;
    let retrieveEvents = 0;
    let createEvents = 0;

    let messageCount = 0;
    const messageHandler = message => {
        const messageToString = Buffer.from(message.data, 'base64').toString();
        let event = JSON.parse(messageToString);

        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);

        let diff = (nowDate - new Date(event.date).getTime()) / 1000;
        diff /= 60;
        const diffMins = Math.abs(Math.round(diff));

        console.log(`\tDifference in minutes: ${diffMins}`);
        if (diffMins < 60) {
            message.ack();
            messageCount += 1;

            switch (event.event) {
                case "ALL_ITEMS_DELETED_FROM_SHOPPING_LIST":
                    deleteEvents += 1;
                    break;
                case "ITEM_ADDED_TO_SHOPPING_LIST":
                    createEvents += 1;
                    break;
                case "ITEM_UPDATED":
                    updateEvents += 1;
                    break;
                case "ITEM_DELETED_FROM_SHOPPING_LIST":
                    deleteEvents += 1;
                    break;
                case "ITEMS_RETRIEVED_FROM_SHOPPING_LIST":
                    retrieveEvents += 1;
                    break;
            }
        } else {
            message.nack();
        }
    };

    subscription.on('message', messageHandler);

    await setTimeout(async () => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
        let documentId = new Date(Date.now());
        let report = {
            itemsCreated: createEvents,
            itemsUpdated: updateEvents,
            itemsDeleted: deleteEvents,
            id: documentId
        }
        console.log(`Report to create: ${JSON.stringify(report)}`);

        await db.collection('shopping-list-report')
            .doc(documentId.toISOString()).set(report);

    }, timeout * 1000);
}