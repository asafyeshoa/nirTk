const Managers = require("../lib/managers");
const managers = new Managers();

async function initialize() {
  await managers.initialize();
}
initialize().then(() => {
  console.log("init managers");
});

exports.setUser = async (ctx) => {
  try {
    const personInfo = ctx.request.body;

    const manager = await managers.addUser(personInfo);
    if (!manager) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = manager;
  } catch (err) {
    log.error(
      `Failed addUser on manager.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.getAllManagers = async (ctx) => {
  try {
    console.log("enter");
    const managersData = await managers.findUsers();
    if (!managersData) ctx.throw(404, "Not Found");
    ctx.status = 200;
    ctx.body = managersData;
  } catch (err) {
    log.error(
      `Failed getAllManagers on manager.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};

exports.updateUser = async (_id, data) => {
  try {
    const user = await managers.updateUser(_id, data);
    if (!user) console.log("manager not found");
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

exports.getEmloyees = async (ctx) => {
  const query = ctx.request.body;

  try {
    const employeeds = await managers.getEmloyees(query);
    if (!employeeds) console.log("employeeds not found");
    ctx.status = 200;
    ctx.body = employeeds;
  } catch (err) {
    log.error(
      `Failed getEmloyees on user.js. params: ${JSON.stringify(
        ctx.params
      )}, with error: ${err}`
    );
    ctx.status = err.status;
    ctx.message = err.message;
  }
};
