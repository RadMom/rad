if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

//import express from express library
const express = require("express");
const app = express();
//we want express-ejs-layouts so we require them
const expressLayouts = require("express-ejs-layouts");

//We show where to search
const indexRouter = require("./routes/index")

//we set our view engine. We will use ejs
app.set("view engine", "ejs");

//We set where our views come from 
app.set("views", __dirname + "/views");

/*We hook our express-layout. The idea is that every single file is put
 inside this layout file so we don't need to duplicate all HTML on every file (like header and footer)
 The file is layout,not layoutS!!! That`s why it wasn`t working and I had error
 (Failed to lookup view "layout" in views directory "C:\Users\Raclav\Documents\JS Fundamentals\WEB\rad/views")*/
app.set("layout", "layouts/layout");

//We tell our express app that we will use express-layouts
app.use(expressLayouts);

// We tell express where our public files will gonna be(like styles,javaScrips,images and others)
app.use(express.static("public"));

//We import mongoose from mongoose library which we instaled(npm i mongoose)
const mongoose = require("mongoose");
// //We set the connection for out DB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"))

//We tell it what to use
app.use("/", indexRouter);

//We tell where our server will listen.When we deploy ot site the rerver will tel us what the port is(process.env.PORT)
app.listen(process.env.PORT || 3000);