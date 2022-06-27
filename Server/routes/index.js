const index = require('express')()
const userController = require('../controller/userController')
const fileUploads = require('../middleware/fileUploads')

index.post('/bio', fileUploads, userController.createEmply)
index.put('/bio/:id', fileUploads, userController.updateBio)
index.delete('/bio/:id', userController.deleteBio)
index.get('/bio', userController.view)
index.get('/bio/view/:id', userController.viewID)

module.exports = index