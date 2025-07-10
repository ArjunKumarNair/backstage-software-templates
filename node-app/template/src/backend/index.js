const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000

app.use(cors());
app.use(express.json());

app.get('/api/greeting', (req, res) => {
    res.json({ message: "Hello from backend!" });
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Backend running from http://localhost:${port}`)
});