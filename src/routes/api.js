/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const userRoutes = require('./users') //use the user route shit

const tasksRoutes = require('./tasks') //use the tasks route 

const projectRoutes = require('./project') //use the project route 

const router = express.Router() //make a new router

router.use('/users/', userRoutes) //tell it to use the userRoutes

router.use('/tasks/', tasksRoutes) //tell it to use the tasksRouter

router.use('/project/', projectRoutes) //tell it to use the projectRouter

module.exports = router

