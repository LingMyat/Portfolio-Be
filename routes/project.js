const express = require("express");
const router  = express.Router();

const ProjectController = require('../controllers/ProjectController');


router.get("/",      ProjectController.index);
router.get("/:slug", ProjectController.show);
router.put("/:id",   ProjectController.update);


module.exports = { projectRouter: router };