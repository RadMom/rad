const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index')
})

//We export our router
module.exports = router;