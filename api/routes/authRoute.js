const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const verify = require("../verifyToken");

router.post("/register", controller.postRegistrationData);

router.post("/login", controller.postLoginData);

router.get("/isAuth", verify, (req, res) => {
  res.json({ ok: 1 });
});

// //auth with react-login
// router.post('/oauthlogin', controller.postOuthLogin);

module.exports = router;
