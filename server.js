const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the 'public' folder
app.use('/', expressStaticGzip('public', {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
}));

// Dynamic route for Unity WebGL builds
app.use('/game/:version', expressStaticGzip('public/games', {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    serveStatic: {
        index: ['index.html']
    }
}));

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Unity WebGL Server</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
