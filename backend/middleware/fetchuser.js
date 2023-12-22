var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Arjunisagoodb$oy';

const fetchuser = (req, res, next) => { //at next the async function will be called under Route 3. Next middleware
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');//this token will be appended in header
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" }) //401 is access denied
        console.log(error)
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
        console.log(error)
    }

}


module.exports = fetchuser;