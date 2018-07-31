import express from "express";
import consign from "consign";



const app= express();


console.log("inicio");
consign()
  .include("src/config/config.js")
  .then("src/lib/util.js")
  .then("src/db.js")
  .then("src/auth.js")
  .then("src/lib/middlewares.js")
  .then("src/routes")
  .then("src/lib/boot.js")
  .into(app);
module.exports=app;

// app.models.user  https://www.npmjs.com/package/consign
// app.models.company
// app.controllers.user
// app.controllers.company
