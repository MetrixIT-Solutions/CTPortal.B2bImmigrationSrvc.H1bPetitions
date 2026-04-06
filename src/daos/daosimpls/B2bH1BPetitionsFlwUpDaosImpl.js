/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');

const cs = require('../../services/CommonSrvc');
const { uType } = require('../../consts/B2bH1BPetitionsConsts.json');
const bH1BPtnFlwups = require('../../schemas/B2BH1BPetitionsFollowups');

const createFlwupObj = (reqBody, tData) => {
  const obj = setFlwUpData(reqBody, tData);
  const ptnObj = new bH1BPtnFlwups(obj);
  return ptnObj;
}

const flwupsListQry = (petition, tData) => {
  return { delFlag: false, petition, b2b: tData.b2b };
}

const getFlwUpQry =  (_id, b2b) => {
  return { delFlag: false, _id, b2b };
}

const updateFlwUpQry = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    notes: reqBody.notes,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

module.exports = {
  createFlwupObj, flwupsListQry, getFlwUpQry, updateFlwUpQry
};

const setFlwUpData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();

  return {
    _id: uuidv4(),
    idSeq: {
      seq: curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },

    euUser: reqBody.euUser,
    euName: reqBody.euName,
    euUID: reqBody.euUID,
    cUId: tData.uid,
    petition: reqBody.petition,
    pId: reqBody.pId,
    pcNum: reqBody.pcNum,
    pType: reqBody.pType,

    b2b: reqBody.b2b,
    b2bName: reqBody.b2bName,
    b2bCode: reqBody.b2bCode,
    org: reqBody.org,
    orgName: reqBody.orgName,
    orgCode: reqBody.orgCode,
    obId: reqBody.obId,
    obName: reqBody.obName,
    obCode: reqBody.obCode,
    team: reqBody.team,
    tName: reqBody.tName,
    tCode: reqBody.tCode,

    notes: reqBody.notes,

    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr,
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}