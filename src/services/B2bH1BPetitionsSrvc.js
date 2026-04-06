/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bh1bPDaoimpl = require('../daos/daosimpls/B2bH1BPetitionsDaosImpl');
const bh1bPDao = require('../daos/B2bH1BPetitionsDaos');
const bh1bPSrvcImpl = require('./srvcimpls/B2bH1BPetitionsSrvcImpl');
const ApiCalls = require('../ApiCalls');
const SetRes = require('../SetRes');
const {uniq} = require('../consts/B2bH1BPetitionsConsts.json');

const postB2bH1BPetitionCreate = (req, tData, callback) => {
  const reqBody = req.body, td = tData.tokenData;
  if (reqBody.euUser) {
    reqBody['ppApproved'] = true;
    creatPtnData(reqBody, tData, callback);
  } else {
    const rptObj = (td.ut === 'Employee' && !reqBody.report) ? {report: td.iss, rprtName: td.fn + ' ' + td.ln, rprtPrimary: td.mp, pReports: [...reqBody.pReports, td.iss]} : {};
    const invData = { ...reqBody, iFrom: 'Petition', ...rptObj };
    ApiCalls.createInvApi(invData, req.headers.ctpb2bua, tData.ctpb2batoken, (err, resObj) => {
      if (resObj?.status == '200') {
        const data = resObj.resData.result;
        const setPtn = bh1bPDaoimpl.setPtnData(data, reqBody);
        creatPtnData(setPtn, tData, callback);
      } else {
        if(err?.data?.status == '105') {
          const cf = SetRes.uniqueErr(uniq.emErr);
          callback(cf);
        } else {
          const cf = SetRes.createFailed({});
          callback(cf);
        }
      }
    });
  }
}

const getB2bH1BPetitionsList = (reqBody, tData, callback) => {
  const obj = bh1bPDaoimpl.petitionsListObj(reqBody, tData);
  bh1bPSrvcImpl.getB2PetitionsListWithAsync(obj.matchQuery, obj.countQuery, reqBody, callback);
}

const putB2bH1BPetitionStatusUpdate = (recordId, reqBody, tData, callback) => {
  const qry = bh1bPDaoimpl.getPetitionQry(recordId, tData.b2b);
  const uObj = bh1bPDaoimpl.setPetitionStsUpdateData(reqBody, tData);
  bh1bPDao.updateB2bPetition(qry, uObj, (resObj) => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const stcLcsObj = bh1bPDaoimpl.setLcsData(obj, 'status', tData);
      bh1bPDao.commonCreateFunc(stcLcsObj.ptnsLcs, (resObj2) => { });
      bh1bPDao.commonCreateFunc(stcLcsObj.ptnStsLcs, (resObj2) => { });
    }
    callback(resObj);
  });
}

const putB2bH1BPetitionUpdateCase = (recordId, reqBody, tData, callback) => {
  const qry = bh1bPDaoimpl.getPetitionQry(recordId, tData.b2b);
  const upObj = bh1bPDaoimpl.updatePetitionCaseQry(reqBody, tData);
  bh1bPDao.updateB2bPetition(qry, upObj, (resObj) => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const lcsObj = bh1bPDaoimpl.setLcsData(obj, 'update', tData);
      bh1bPDao.commonCreateFunc(lcsObj.ptnsLcs, (resObj2) => { });
    }
    callback(resObj);
  });
}

const getB2bH1BPetitionStsLfcsList = (recordId, tData, callback) => {
  const qry = bh1bPDaoimpl.getStsLfcsQry(recordId, tData.b2b);
  bh1bPDao.getB2bH1BPetitionStsLfcsList(qry, callback);
}

const putB2bH1BPetitionPriorityUpdate = (recordId, reqBody, tData, callback) => {
  const qry = bh1bPDaoimpl.getPetitionQry(recordId, tData.b2b);
  const upObj = bh1bPDaoimpl.updatePetitionPriorityQry(reqBody, tData);
  bh1bPDao.updateB2bPetition(qry, upObj, (resObj) => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const lcsObj = bh1bPDaoimpl.setLcsData(obj, 'update', tData);
      bh1bPDao.commonCreateFunc(lcsObj.ptnsLcs, (resObj2) => { });
    }
    callback(resObj);
  });
}

const putB2bH1BPpAprvdUpdate = (recordId, tData, callback) => {
  const obj = bh1bPDaoimpl.updatePpAprvdQry(recordId, tData);
  bh1bPDao.updateB2bPetition(obj.query, obj.upObj, (resObj) => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const lcsObj = bh1bPDaoimpl.setLcsData(obj, 'update', tData);
      bh1bPDao.commonCreateFunc(lcsObj.ptnsLcs, (resObj2) => { });
    }
    callback(resObj);
  });
}

const postB2bH1BTempCount = (reqBody, callback) => {
  const qryObj = bh1bPDaoimpl.seth1btCountObj(reqBody);
  bh1bPDao.updateB2bPetition(qryObj.query, qryObj.updateObj, resObj => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const lcsObj = bh1bPDaoimpl.setCanLcsData(obj, reqBody.tempData);
      bh1bPDao.commonCreateFunc(lcsObj, (resObj2) => { });
    }
    callback(resObj);
  });
}

const putB2bH1BPetitionDelete = (recordId, reqBody, tData, callback) => {
  const qry = bh1bPDaoimpl.getPetitionQry(recordId, tData.b2b);
  const upObj = bh1bPDaoimpl.deletePetitionQry(reqBody, tData);
  bh1bPDao.updateB2bPetition(qry, upObj, (resObj) => {
    if (resObj.status == '200') {
      const obj = Object.assign({}, resObj.resData.result.toObject())
      const lcsObj = bh1bPDaoimpl.setLcsData(obj, 'delete', tData);
      bh1bPDao.commonCreateFunc(lcsObj.ptnsLcs, (resObj2) => { });
    }
    callback(resObj);
  });
}

module.exports = {
  postB2bH1BPetitionCreate, getB2bH1BPetitionsList, putB2bH1BPetitionStatusUpdate,
  putB2bH1BPetitionUpdateCase, getB2bH1BPetitionStsLfcsList, putB2bH1BPetitionPriorityUpdate, putB2bH1BPpAprvdUpdate,
  postB2bH1BTempCount, putB2bH1BPetitionDelete
};

const creatPtnData = (reqBody, tData, callback) => {
  const obj = bh1bPDaoimpl.createPetitionObj(reqBody, tData.tokenData);
  bh1bPDao.commonCreateFunc(obj.ptnObj, (resObj) => {
    if (resObj.status == '200') {
      bh1bPDao.commonCreateFunc(obj.ptnLcs, (resObj1) => {});
      bh1bPDao.commonCreateFunc(obj.ptnStsLcs, (resObj2) => {});
      if (reqBody?.temp?.length) {
        const pData = Object.assign({}, resObj.resData.result.toObject());
        const temData = bh1bPDaoimpl.tempData({ ...pData, lType: reqBody.lType });
        ApiCalls.b2bPetitionTempCkLstCreate(temData, tData.ctpb2batoken, (err, resObj) => { });
      }
    }
    callback(resObj);
  });
}