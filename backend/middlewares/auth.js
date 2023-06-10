const jwt = require("jsonwebtoken");
const Error401 = require("../errors/401");
const JWT_DEV = require("../utils/jwtDev");

const NODE_ENV_PROD = process.env.REACT_APP_NODE_ENV;
const JWT_KEY = process.env.REACT_APP_JWT_KEY;

const middlewareAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error401("Токен отстутствует");
    }
    req.user = jwt.verify(token, NODE_ENV_PROD === "production" ? JWT_KEY : JWT_DEV);
    next();
  } catch {
    const badToken = new Error401("Токен недействителен");
    next(badToken);
  }
};

module.exports = middlewareAuth;
