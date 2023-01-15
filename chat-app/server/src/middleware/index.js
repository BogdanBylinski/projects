const admin = require("../config/firebase.config");
class Middleware {
  async decodeToken(req, res, next) {
    const token = req;
    console.log(req.query);
    if (token.query.Authorization.split(" ")[1] === "undefined") {
      return res.json({ message: "Bad token" });
    }
    // console.log(token, "asodjaisdiausdhaisdhauhdasiidhasuduashui");
    try {
      const decodeValue = await admin
        .auth()
        .verifyIdToken(token.query.Authorization.split(" ")[1]);
      if (decodeValue) {
        req.user = decodeValue;

        // console.log(req.user);
        // console.log(req.user);
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      console.log(e);
      if (e.code === "auth/id-token-expired") {
        return res.json({ message: "auth/id-token-expired" });
      }
      return res.json({ message: "Internal Error" });
    }
  }
}

module.exports = new Middleware();
