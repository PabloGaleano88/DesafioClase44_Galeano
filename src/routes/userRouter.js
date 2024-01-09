import { Router } from "express";
import passport from 'passport'
import { loginPassport, registerPassport, logout, githubLogin, passResetReq, passReset, changeRole, uploadDocuments } from "../controllers/userController.js";
import { uploader } from "../middlewares/multer.js";

const uRouter = Router()

uRouter.post('/signup', passport.authenticate('register', { failureRedirect: '/failregister' }), registerPassport)

uRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login?login_fail=true' }), loginPassport)

uRouter.get('/logout', logout)

uRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

uRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubLogin)

uRouter.post('/passresetreq',passResetReq)

uRouter.post('/passreset/:rid',passReset)

uRouter.put('/users/premium/:uid',changeRole)

uRouter.post('/users/:uid/documents', uploader.fields([{name:'profilePic', maxCount: 1},{name:'idDoc', maxCount:1},{name:'addressDoc',maxCount:1},{name:'accountStatus',maxCount:1}]),uploadDocuments)

export default uRouter