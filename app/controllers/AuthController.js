const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

const { signAuthToken, randomStr } = require("../util");

const service = require("../../config/service");

const { User } = require("../models/index");

/**
 * Auth the give user and return JWT
 * @param ctx
 * @param next
 * @return {Promise<object>}
 */
async function auth(ctx, next) {
  const requestData = ctx.request.body;

  let user = await User.findOne({
    where: { email: requestData.email },
    attributes: ["id", "name", "email", "password"]
  });

  if (!user) {
    ctx.status = 401;
    return (ctx.body = {
      message: `Not exists a email with ${
        requestData.email
      }, did you already registry it?`
    });
  }

  if (bcrypt.compareSync(requestData.password, user.password)) {
    return (ctx.body = {
      token: signAuthToken(user)
    });
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Authentication Error"
    };
  }
}

/**
 *
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
async function github(ctx, next) {
  const redirectToGithubIdentityUrl =
    "https://github.com/login/oauth/authorize";

  const url = `${redirectToGithubIdentityUrl}?client_id=${
    service.github.client_id
  }&scope=${service.github.scope}`;

  await ctx.render("github", {
    url: url
  });
}

/**
 * Github callback, return JWT
 * @param ctx
 * @param next
 * @return {Promise<object >}
 */
async function githubCallback(ctx, next) {
  //
  // get github token
  //
  const getAccessTokenUrl = "https://github.com/login/oauth/access_token";
  const response = await fetch(getAccessTokenUrl, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: service.github.client_id,
      client_secret: service.github.client_secret,
      code: ctx.request.query.code
    })
  });

  let token = await response.json();
  token = token["access_token"];

  //
  // request github user information through access_token
  //
  let githubUser = await fetch(service.github.user_info_url + token);
  githubUser = await githubUser.json();

  //
  // find if exists associate user
  //
  let user = await User.findOne({
    where: { email: githubUser.email, github: githubUser.id }
  });

  //
  // create if not exists
  //
  if (!user) {
    user = await User.create({
      email: githubUser.email,
      name: githubUser.name,
      github: githubUser.id,
      password: bcrypt.hashSync(randomStr(), 3),
      rememberToken: token
    });
  }

  //
  // update token
  //
  user.rememberToken = token;
  await user.save();

  // return JWT token
  ctx.body = {
    token: signAuthToken(user)
  };
}

module.exports = { auth, github, githubCallback };
