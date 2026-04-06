/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const util = require('../lib/util');
const SetRes = require('../SetRes');
const tokens = require('../tokens');
const bh1bPSrvc = require('../services/B2bH1BPetitionsSrvc');
const bh1bPCv = require('./apiVldns/B2bH1BPetitionsCtrlVldns');

const apiServerStatus = (req, res) => {
  const resObj = SetRes.apiServerStatus();
  util.sendApiRes(res, resObj);
}

const postB2bH1BPetitionCreate = (req, res) => {
  const vds = bh1bPCv.createVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.postB2bH1BPetitionCreate(req, tData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bH1BPetitionsList = (req, res) => {
  const vds = bh1bPCv.listVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.getB2bH1BPetitionsList(req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bH1BPetitionStatusUpdate = (req, res) => {
  const vds = bh1bPCv.euPetitionStatusVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.putB2bH1BPetitionStatusUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bH1BPetitionUpdateCase = (req, res) => {
  const vds = bh1bPCv.updateCaseVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.putB2bH1BPetitionUpdateCase(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bH1BPetitionStsLfcsList = (req, res) => {
  const vds = bh1bPCv.viewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.getB2bH1BPetitionStsLfcsList(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bH1BPetitionPriorityUpdate = (req, res) => {
  const vds = bh1bPCv.viewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.putB2bH1BPetitionPriorityUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bH1BPpAprvdUpdate = (req, res) => {
  const vds = bh1bPCv.viewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.putB2bH1BPpAprvdUpdate(req.params.recordId, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const postB2bH1BTempCount = (req, res) => {
  bh1bPSrvc.postB2bH1BTempCount(req.body, (resObj) => {
    util.sendApiRes(res, resObj);
  });
}

const putB2bH1BPetitionDelete = (req, res) => {
  const vds = bh1bPCv.viewVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPSrvc.putB2bH1BPetitionDelete(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  apiServerStatus, postB2bH1BPetitionCreate, getB2bH1BPetitionsList, putB2bH1BPetitionStatusUpdate,
  putB2bH1BPetitionUpdateCase, getB2bH1BPetitionStsLfcsList, putB2bH1BPetitionPriorityUpdate, putB2bH1BPpAprvdUpdate,
  postB2bH1BTempCount, putB2bH1BPetitionDelete
};
