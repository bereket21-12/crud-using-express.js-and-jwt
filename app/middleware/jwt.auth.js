const jwt  = require("jsonwebtoken")
const config = require("../config/jwt-config")

verifyToken = (req, res,next) => {
    
    const bearer = req.headers["authorization"];
    let token = bearer.split(" ")[1];
    if (!token) {
        
        return res.status(403).send({ message: "Error to get the token" });
        
    }

    jwt.verify(token, config.secret, () => {
                if (err) {
                  return res.status(401).send({
                    message: "User unauthorized!",
                  });
                }
                req.userId = decoded.id;
                next();
    })
}

const jwtAuth = {
  verifyToken: verifyToken,
};

module.exports = jwtAuth;