const Users = require("../lib/users");
const users = new Users();
const managerController = require("../controllers/managers");

async function initialize() {
  await users.initialize();
}
initialize().then(() => {
  console.log("init");
});

exports.setUser = async (ctx) => {
  try {
    const personInfo = ctx.request.body;
    const user = await users.addUser(personInfo);
    if (!user) ctx.throw(404, "Not Found");
    else {
      await managerController.updateUser(
        { _id: personInfo.manager },
        { employed: user._id }
      );
      ctx.status = 200;
      ctx.body = user;
    }
  } catch (err) {
    log.error(
      `Failed addUser on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.deleteUser = async (ctx) => {
  try {
    const id = ctx.request.body;
    const user = await users.deleteUser(id);
    if (!user) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    log.error(
      `Failed deleteUser on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.updateUser = async (ctx) => {
  try {
    const { _id, data } = ctx.request.body;
    const user = await users.updateUser({ _id }, data);
    if (!user) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    log.error(
      `Failed updateUser on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const usersData = await users.findUsers();
    if (!usersData) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = usersData;
  } catch (err) {
    log.error(
      `Failed findUsers on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.getUserById = async (ctx) => {
  const { _id } = ctx.request.body;
  try {
    const user = await users.findUser({ _id });
    if (!user) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    log.error(
      `Failed findUser on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};
