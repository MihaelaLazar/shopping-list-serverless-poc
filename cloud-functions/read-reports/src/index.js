const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.readReports = async(req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    let reportsPerTimestamp = [];

    const nowDate = new Date();
    nowDate.setDate(nowDate.getDate() - 7);
    let last_week_date_range = admin.firestore.Timestamp.fromDate(new Date(nowDate));

    const snapshot = await db.collection('shopping-list-report')
        .where('id', '>=', last_week_date_range)
        .get();
    snapshot.forEach((doc) => {
        reportsPerTimestamp.push({
            id: doc.data().id.toDate(),
            itemsCreated: doc.data().itemsCreated,
            itemsUpdated: doc.data().itemsUpdated,
            itemsDeleted: doc.data().itemsDeleted,
        });
    });

    res.send(reportsPerTimestamp);
}