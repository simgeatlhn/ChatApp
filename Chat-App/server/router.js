const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('server is up and running'); //localhost:5000 de yazar
});

module.exports = router;