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
    const diObj = JSON.parse(req.headers.ctpb2bua);
    if (!diObj?.ip) {
      const te = sRes.headersRequired();
      return { flag: false, result: te };
    } else if (!reqBody.refType || !reqBody.refByName || !reqBody.pReports || !reqBody.pType || !reqBody.pDate) {
      const mn = sRes.mandatory();
      return { flag: false, result: mn };
    } else {
      return { flag: true };
    }
  }
}

const listVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!reqBody.pgNum || !reqBody.limit) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const euPetitionStatusVldn = (req) => {
  const reqBody = req.body;
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !reqBody.status) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const updateCaseVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !req.body.pcNum) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const viewVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

const priorityUpdateVldn = (req) => {
  if (!req.headers.ctpb2batoken) {
    const te = sRes.tokenRequired();
    return { flag: false, result: te };
  } else if (!req.params.recordId || !req.body.priority) {
    const mn = sRes.mandatory();
    return { flag: false, result: mn };
  } else {
    return { flag: true };
  }
}

module.exports = {
  tokenVldn, createVldn, listVldn, euPetitionStatusVldn, updateCaseVldn, viewVldn, priorityUpdateVldn
};
