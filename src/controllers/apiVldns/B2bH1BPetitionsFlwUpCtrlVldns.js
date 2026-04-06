/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const sRes = require('../../SetRes');

const tokenVldn = (tData) => {
  if (!tData) {
    const result = sRes.tokenInvalid();
    return { flag: false, result };
  } else if (tData.isExpired) {
    const result = sRes.tokenExpired();
    return { flag: false, result };
  } else if (!tData.tokenData) {
    const result = sRes.tokenSsnErr();
    return { flag: false, result };
  } else {
    return { flag: true, result: tData.tokenData };
  }
}

const createVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.headers.ctpb2bua) {
    const te = sRes.headersRequired();
    return { flag: false, result: te };
  } else {
    if (!reqBody.notes || !reqBody.euUser || !reqBody.euName || !reqBody.euUID || !reqBody.petition || !reqBody.pId || !reqBody.pcNum || !reqBody.pType || !reqBody.b2b || !reqBody.b2bName || !reqBody.b2bCode || !reqBody.org || !reqBody.orgName || !reqBody.orgCode || !reqBody.team || !reqBody.tName || !reqBody.tCode) {
      const mn = sRes.mandatory();
      return { flag: false, result: mn };
    } else {
      return { flag: true };
    }
  }
}

const listVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.petition) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const updateVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !req.body.notes) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, createVldn, listVldn, updateVldn
};
