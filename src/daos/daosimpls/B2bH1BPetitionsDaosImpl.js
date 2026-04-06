/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

var { v4: uuidv4 } = require('uuid');
var moment = require('moment');

const cs = require('../../services/CommonSrvc');
const { uType, openStatus, sApp } = require('../../consts/B2bH1BPetitionsConsts.json');
const bH1BPetitions = require('../../schemas/B2bH1BPetitions');
const bH1BPetitionsLcs = require('../../schemas/B2bH1BPetitionsLcs');
const bH1BPetitionsStsLcs = require('../../schemas/B2bH1BPetitionsStsLcs');

const createPetitionObj = (reqBody, tData) => {
  const obj = setPetitionData(reqBody, tData);
  const ptnObj = new bH1BPetitions(obj);
  const ptnLcsObj = { ...obj, petition: ptnObj._id, _id: uuidv4() }
  const ptnLcs = new bH1BPetitionsLcs(ptnLcsObj);
  const ptnStsLcs = new bH1BPetitionsStsLcs(ptnLcsObj);
  return { ptnObj, ptnLcs, ptnStsLcs }
}

const setPtnData = (resData, reqBody) => {
  return {
    ...reqBody,
    euUser: resData._id,
    euName: resData.name,
    euMobCcNum: resData.mobCcNum,
    euEmID: resData.emID,
    euUID: resData.refUID,
    euPrimary: resData.myPrimary
  }
}

const petitionsListObj = (reqBody, tData) => {
  return setListQuery(reqBody, tData);
}
const getPetitionQry = (_id, b2b) => {
  return { _id, delFlag: false, b2b };
}

const setPetitionStsUpdateData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    pStatus: reqBody.status,
    psStatus: reqBody.psStatus,
    psNotes: reqBody.psNotes,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  };
}

const setLcsData = (resData, type, tData) => {
  const curUtc = cs.currUTCObj();
  const obj = {
    ...resData,
    _id: uuidv4(),
    petition: resData._id,

    cuType: uType,
    cUser: tData.iss,
    cuName: tData.fn + ' ' + tData.ln,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr
  };
  const ptnStsLcs = type == 'status' ? new bH1BPetitionsStsLcs(obj) : {};
  const ptnsLcs = new bH1BPetitionsLcs(obj);
  return {ptnStsLcs, ptnsLcs};
}
const setCanLcsData = (resData, reqBody) => {
  const curUtc = cs.currUTCObj();
  const obj = {
    ...resData,
    _id: uuidv4(),
    petition: resData._id,

    cuType: reqBody.uuType,
    cUser: reqBody.uUser,
    cuName: reqBody.uuName,
    cDate: curUtc.currUTCDtTm,
    cDtStr: curUtc.currUTCDtTmStr
  };
  const ptnsLcs = new bH1BPetitionsLcs(obj);
  return ptnsLcs;
}

const updatePetitionCaseQry = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    pcNum: reqBody.pcNum,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  }
}

const getStsLfcsQry = (petition, b2b) => {
  return { petition, b2b };
}

const updatePetitionPriorityQry = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  return {
    priority: reqBody.priority,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  }
}

const updatePpAprvdQry = (euUser, tData) => {
  const curUtc = cs.currUTCObj();
  const query = { euUser, delFlag: false, b2b: tData.b2b };
  const upObj = {
    ppApproved: true,

    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr,
  };
  return { query, upObj };
}

const tempData = (data) => {
  const temp = data.temp?.length ? data.temp : [];
  return {
    tempId: temp[0]._id,
    tdCount: temp[0].tdCount,
    lid: data._id,
    leadId: data.pId,
    lType: data.lType,
    team: data.team,
    tName: data.tName,
    tCode: data.tCode,
    report: data.report,
    rprtName: data.rprtName,
    rprtPrimary: data.rprtPrimary,
    pReports: data.pReports,
    euUser: data.euUser,
    euName: data.euName,
    euMobCcNum: data.euMobCcNum,
    euEmID: data.euEmID,
    euUID: data.euUID,
    euPrimary: data.euPrimary,
  };
}


const seth1btCountObj = (reqBody) => {
  const curUtc = cs.currUTCObj();
  const query = { _id: reqBody.lid, 'temp._id': reqBody.tempId, delFlag: false};
  const uSetObj = reqBody.upType == 'Approve' ? {
    'temp.$.tdaCount': reqBody.tdaCount,
  } : {
    'temp.$.tdpCount': reqBody.tdpCount, 
    'temp.$.tdaCount': reqBody.tdaCount,
    'temp.$.tdcCount': reqBody.tdcCount,
    'temp.$.tdoCount': reqBody.tdoCount,
  }
  const updateObj = {
    $set: {
      ...uSetObj,
      pStatus: 'Review',
      pVerified: reqBody?.tdCount == reqBody.tdaCount ? 'Verified' : 'Pending',
      uuType: uType,
      uDate: curUtc.currUTCDtTm,
      uDtStr: curUtc.currUTCDtTmStr
    }
  };
  return {query, updateObj};
}

const deletePetitionQry = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const delDtTm = moment.utc().format('YYYYMMDDHHmmss');  

  return {
    delFlag: true,

    pId: reqBody.pId + '_DEL_' + delDtTm,
    pcNum: reqBody.pcNum + '_DEL_' + delDtTm, 
    uuType: uType,
    uUser: tData.iss,
    uuName: tData.fn + ' ' + tData.ln,
    uDate: curUtc.currUTCDtTm,
    uDtStr: curUtc.currUTCDtTmStr
  };
}

module.exports = {
  createPetitionObj, setPtnData, petitionsListObj, getPetitionQry, setPetitionStsUpdateData, setLcsData, setCanLcsData, updatePetitionCaseQry,
  getStsLfcsQry, updatePetitionPriorityQry, updatePpAprvdQry, tempData, seth1btCountObj, deletePetitionQry
};

const setPetitionData = (reqBody, tData) => {
  const curUtc = cs.currUTCObj();
  const pReports = tData.ut == 'Employee'? [...new Set([...reqBody.pReports, tData.iss])] : [...new Set(reqBody.pReports)];
  const year = curUtc.currUTCYear - 2025;
  const day = curUtc.currUTCDayOfYear;
  const cuTmInScnds = curUtc.time;
  const nm = reqBody.euName.replace(/\s+$/, '').toUpperCase();
  const name = cs.randomStrGen(nm, 3);
  const pId = 'P' + year + day + '-' + name + cuTmInScnds;
  const pcNum = 'C' + year + day + '-' + name + cuTmInScnds;
  const rprtName = tData.ut != 'Employee' ? reqBody.rprtName: tData.fn + ' ' + tData.ln;
  const searchStr = reqBody.euName + '<#$>' + reqBody.euEmID + '<#$>' + reqBody.tName + '<#$>' + rprtName + '<#$>' + pId + '<#$>' + pcNum + '<#$>' + reqBody.pType + '<#$>' + reqBody.euMobCcNum;
  return {
    _id: uuidv4(),
    idSeq: {
      seq: curUtc.currUTCYear + curUtc.currUTCMnt + curUtc.currUTCDay,
      year: curUtc.currUTCYear,
      month: curUtc.currUTCMnt,
      day: curUtc.currUTCDay
    },
    b2b: tData.b2b,
    b2bName: tData.bn,
    b2bCode: tData.bc,

    refType: reqBody.refType,
    refByUser: reqBody.refByUser || '',
    refByUID: reqBody.refByUID || '',
    refByName: reqBody.refByName,

    org: reqBody.org ? reqBody.org : tData.org,
    orgName: reqBody.orgName ? reqBody.orgName : tData.on,
    orgCode: reqBody.orgCode ? reqBody.orgCode : tData.oc,

    obId: reqBody.obId || '',
    obName: reqBody.obName || '',
    obCode: reqBody.obCode || '',

    team: reqBody.team,
    tName: reqBody.tName,
    tCode: reqBody.tCode,
    searchStr,

    report: tData.ut != 'Employee' ? reqBody.report : tData.iss,
    rprtName,
    rprtPrimary: tData.ut != 'Employee' ? reqBody.rprtPrimary: tData.mp,
    pReports,

    euUser: reqBody.euUser,
    euName: reqBody.euName,
    euMobCcNum: reqBody.euMobCcNum || '',
    euEmID: reqBody.euEmID,
    euUID: reqBody.euUID,
    euPrimary: reqBody.euPrimary,

    pId,
    pcNum,
    pType: reqBody.pType,
    pNotes: reqBody.pNotes || '',
    pDate: reqBody.pDate,
    pStatus: openStatus,
    psNotes: reqBody.psNotes || '',
    ppApproved: reqBody.ppApproved || false,

    wrkUrls: reqBody.wrkUrls || [],

    executive: reqBody.executive || '',
    attorney: reqBody.attorney || '',

    temp: reqBody.temp || [],

    priority: reqBody.priority || '999',

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

const setListQuery = (reqBody, tData) => {
  const searchStr = reqBody?.searchStr || '';
  const status = reqBody?.status?.length ? { pStatus: { $in: reqBody.status } } : {};
  const pReports = (tData.ut != 'Employee') ? {} : { pReports: { $in: [tData.iss] } }
  const matchQuery = {
    delFlag: false,
    b2b: tData.b2b,
    ...status,
    ...pReports,
    $or: [
      { 'searchStr': { $regex: searchStr, $options: 'i' } }
    ]
  };
  var countQuery = [
    { $match: { delFlag: false, b2b: tData.b2b, ...pReports } },
    { $group: { _id: '$pStatus', count: { $sum: 1 } } }
  ]
  return { matchQuery, countQuery };
};
