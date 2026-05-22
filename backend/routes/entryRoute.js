import express from 'express'
import { isAuthenticated } from '../middleware/authMiddleware.js'
import { createEntry, getEntries, updateEntry } from '../controllers/entryController.js'
const router = express.Router()

router.post('/create',isAuthenticated,createEntry)
router.get('/getentry',isAuthenticated,getEntries)
router.post('/update/:id',isAuthenticated,updateEntry)

export default router