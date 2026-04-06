/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var axios = require('axios');
var config = require('config');

const createInvApi= (data, ctpb2bua, ctpb2batoken, callback) => {
  const headers = { headers: {ctpb2batoken, ctpb2bua} };
  axios.post(config.invCreateApi, data, headers)
    .then((res) => callback(null, res.data)).catch((err) => callback(err.response, null));
}

const getSmtpDetails = (body, callback) => {
  axios.post(config.getSmtpDetailsApi, body, {}).then((res) => callback(null, res.data)).catch((err) => callback(err, null));
}

const b2bPetitionTempCkLstCreate = (data, ctpb2batoken, callback) => {
  const headers = { headers: {ctpb2batoken} };
  axios.post(config.b2bLeadTempCklCreateApi, data, headers).then((res) => callback(null, res.data)).catch((err) => callback(err, null));
}

module.exports = {
  createInvApi, getSmtpDetails, b2bPetitionTempCkLstCreate
};
