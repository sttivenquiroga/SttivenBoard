const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{
    let jwtToken = req.header("Authorization");
    if (!jwtToken) return res.status(400).send("Acceso no concedido, no hay un token");
    jwtToken = jwtToken.split(" ")[1];
    if (!jwtToken) return res.status(400).send("Acceso no concedido, no hay un token");
    try {
        const payload = jwt.verify(jwtToken, "SttiveJWT");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Acceso no concedido, token no válido");
    }
};
module.exports = auth;