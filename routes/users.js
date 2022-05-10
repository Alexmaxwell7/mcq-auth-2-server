const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/Auth");

const QuestionController=require('../controller/question');

router.get('/getallquestions',QuestionController.getquestion);
router.get('/getsubjects',QuestionController.getsubjects);
router.get('/getquestionbyid/:id',QuestionController.getquestionbyId);
router.get('/getsubjectbyid/:id',QuestionController.getsubjectbyId);
router.post('/createquestion',QuestionController.createquestion);
router.post('/createsubject',QuestionController.createsubject);
router.put('/updatequestion/:id',QuestionController.updatequestion);
router.delete('/deletequestion/:id',QuestionController.deletequestion);


// Users Registeration Route
router.post("/register-student", async (req, res) => {
  await userRegister(req.body, "student", res);
});

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Super Admin Registration Route
router.post("/register-staff", async (req, res) => {
  await userRegister(req.body, "staff", res);
});

// Users Login Route
router.post("/login-student", async (req, res) => {
  await userLogin(req.body, "student", res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Super Admin Login Route
router.post("/login-staff", async (req, res) => {
  await userLogin(req.body, "staff", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/student-protectd",
  userAuth,
  checkRole(["student"]),
  QuestionController.getquestion,
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/staff-protectd",
  userAuth,
  checkRole(["staff"]),
  QuestionController.getquestion,
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/staff-and-admin-protectd",
  userAuth,
  checkRole(["staff", "admin"]),
  async (req, res) => {
    return res.json(" staff and Admin");
  }
);



module.exports = router;
