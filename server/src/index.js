const app = require('./App');

const PORT = process.env.PORT || 3001;
const HOST = '192.168.10.14'

app.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});