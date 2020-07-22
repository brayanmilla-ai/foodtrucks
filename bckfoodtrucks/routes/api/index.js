// Funcion de Conmutador de Entidades del Api
var express = require("express");
var router = express.Router();
var passport = require("passport");
var passportJWT = require("passport-jwt");

var extractJWT = passportJWT.ExtractJwt;
var strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, next) => {
      var user = payload;
      console.log(user);
      return next(null, user);
    }
  )
);

var secRoutes = require("./sec");
var deliveryRoutes = require("./delivery");
var restaurantesRoutes = require("./restaurantes");
var clienteRoutes = require("./cliente");

//publicas
router.use("/sec", secRoutes);
router.use("/restaurantes", restaurantesRoutes);

const jwtAuthMiddleware = passport.authenticate("jwt", { session: false });
//privadas
router.use("/delivery", jwtAuthMiddleware, deliveryRoutes);
router.use("/cliente", jwtAuthMiddleware, clienteRoutes);

module.exports = router;
