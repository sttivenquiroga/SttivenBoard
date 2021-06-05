const jwt = require("jsonwebtoken");
/**
 * Autentication module, to do any action
 */
const auth = (req, res, next) =>{
    let jwtToken = req.header("Authorization");
    if (!jwtToken) return res.status(400).send("Acceso no concedido, no hay un token");
    jwtToken = jwtToken.split(" ")[1];
    if (!jwtToken) return res.status(400).send("Acceso no concedido, no hay un token");
    try {
        const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send("Acceso no concedido, token no válido");
    }
};
module.exports = auth;