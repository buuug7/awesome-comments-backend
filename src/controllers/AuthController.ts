import * as bcrypt from 'bcrypt';

import fetch from 'node-fetch';

import { signAuthToken, randomStr } from '../util';

import config from '../config';

import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import HttpStatus from 'http-status-codes';

/**
 * Auth the give user and return JWT
 * @param ctx
 * @param next
 * @return {Promise<object>}
 */
async function auth(ctx, next) {
  const requestData = ctx.request.body;
  console.log(requestData);

  if (!requestData.email || !requestData.password) {
    ctx.status = HttpStatus.BAD_REQUEST;
    ctx.body = {
      message: `password or email parameter is not missing`
    };
    return;
  }

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: { email: requestData.email }
  });

  if (!user) {
    ctx.status = HttpStatus.UNAUTHORIZED;
    ctx.body = {
      message: `not exists a email with ${
        requestData.email
      }, did you already register it?`
    };
    return;
  }

  if (bcrypt.compareSync(requestData.password, user.password)) {
    ctx.body = {
      token: signAuthToken(user)
    };
    return;
  } else {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }
}

/**
 *
 * @param ctx
 * @param next
 * @return {Promise<void>}
 */
// async function github(ctx, next) {
//   const redirectToGithubIdentityUrl =
//     'https://github.com/login/oauth/authorize';
//
//   const url = `${redirectToGithubIdentityUrl}?client_id=${
//     config.github.client_id
//   }&scope=${config.github.scope}`;
//
//   await ctx.render('github', {
//     url: url
//   });
// }

/**
 * Github callback, return JWT
 * @param ctx
 * @param next
 * @return {Promise<object >}
 */
// async function githubCallback(ctx, next) {
//   //
//   // get github token
//   //
//   const getAccessTokenUrl = 'https://github.com/login/oauth/access_token';
//   const response = await fetch(getAccessTokenUrl, {
//     method: 'post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       client_id: config.github.client_id,
//       client_secret: config.github.client_secret,
//       code: ctx.request.query.code
//     })
//   });
//
//   let token = await response.json();
//   token = token['access_token'];
//
//   //
//   // request github user information through access_token
//   //
//   let githubUser = await fetch(config.github.user_info_url + token);
//   githubUser = await githubUser.json();
//
//   //
//   // find if exists associate user
//   //
//   let user = await User.findOne({
//     where: { email: githubUser.email, github: githubUser.id }
//   });
//
//   //
//   // create if not exists
//   //
//   if (!user) {
//     user = await User.create({
//       email: githubUser.email,
//       name: githubUser.name,
//       github: githubUser.id,
//       password: bcrypt.hashSync(randomStr(), 3),
//       rememberToken: token
//     });
//   }
//
//   //
//   // update token
//   //
//   user.rememberToken = token;
//   await user.save();
//
//   // return JWT token
//   ctx.body = {
//     token: signAuthToken(user)
//   };
// }

export { auth /*github, githubCallback*/ };
