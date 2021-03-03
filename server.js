const express = require('express');
const app = express();
const port = 8000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     // render files
// })

app.listen(port, console.log(`listening on port ${port}`));