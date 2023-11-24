import express from 'express'
import { UserControllers } from './user.controllers'

const router = express.Router()

router.post('/', UserControllers.createUser)
router.get('/', UserControllers.getAllUsers)
router.delete('/:userId', UserControllers.deleteUserByUserId)
router.get('/:userId', UserControllers.getSingleUserByUserId)
router.put('/:userId', UserControllers.updateUserByUserId)
router.put('/:userId/orders', UserControllers.createNewOrder)

export const UserRoutes = router
