const Router = require("koa-router");
const router = new Router();
const controllersUsers = require("../controllers/users");
const controllersManagers = require("../controllers/managers");

router.post("/setUser", controllersUsers.setUser);

router.get("/getUsers", controllersUsers.getAllUsers);

router.delete("/deleteUser", controllersUsers.deleteUser);

router.put("/updateUser", controllersUsers.updateUser);

router.get("/getUserById", controllersUsers.getUserById);

router.post("/setManager", controllersManagers.setUser);

router.get("/getManagers", controllersManagers.getAllManagers);

router.get("/getManagerEmplooyees", controllersManagers.getEmloyees);

router.allowedMethods();
module.exports = router;
