
const express = require('express')
const routes = express.Router()

const AnnotationController = require('./controllers/AnnotationController')
const PriotityController = require('./controllers/PriotityController')
const ContentController = require('./controllers/ContentController')

// Rota Annotations
routes.post('/annotations', AnnotationController.create)
routes.get('/annotations', AnnotationController.read)
routes.delete('/annotations/:id', AnnotationController.delete)

// Rota Priotity

routes.get('/priorities', PriotityController.read)
routes.post('/priorities/:id', PriotityController.update)

// Rota Content

routes.post('/contents/:id', ContentController.update)

module.exports = routes; 