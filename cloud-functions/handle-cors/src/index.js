const allowedOrigins = ['http://localhost:3000', 'http://storage.googleapis.com'];

exports.handleCors = (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s
    if (allowedOrigins.find(e => e === req.headers.origin)) {
        res.set('Access-Control-Allow-Origin', req.headers.origin);
    }

    // Send response to OPTIONS requests
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    }
}
