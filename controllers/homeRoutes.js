const router = require("express").Router();
const { User, Goals, Expenses } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: {
        exclude: ["password"],
      },
      include: [Goals, Expenses]
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render("dashboard", {
      title: "Dashboard",
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("logout");
});

router.get("/dashboard", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("dashboard");
});

router.get("/expenses", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("expenses");
});

module.exports = router;
