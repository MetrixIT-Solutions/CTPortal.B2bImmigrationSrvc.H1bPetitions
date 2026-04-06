/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const util = require('../lib/util');
const tokens = require('../tokens');
const bh1bPFlwUpSrvc = require('../services/B2bH1BPetitionsFlwUpSrvc');
const bh1bPFlwUpCv = require('./apiVldns/B2bH1BPetitionsFlwUpCtrlVldns');

const postB2bH1BPtnFlwupCreate = (req, res) => {
  const vds = bh1bPFlwUpCv.createVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPFlwUpCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPFlwUpSrvc.postB2bH1BPtnFlwupCreate(req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const getB2bH1BPtnFlwupsList = (req, res) => {
  const vds = bh1bPFlwUpCv.listVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPFlwUpCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPFlwUpSrvc.getB2bH1BPtnFlwupsList(req.params.petition, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

const putB2bH1BPtnFlwupUpdate = (req, res) => {
  const vds = bh1bPFlwUpCv.updateVldn(req);
  if (vds.flag) {
    tokens.refreshToken(req.headers.ctpb2batoken, res, (tData) => {
      const tv = bh1bPFlwUpCv.tokenVldn(tData);
      if (tv.flag) {
        bh1bPFlwUpSrvc.putB2bH1BPtnFlwupUpdate(req.params.recordId, req.body, tData.tokenData, (resObj) => {
          const apiRes = { ...resObj, userObj: tData?.data };
          util.sendApiRes(res, apiRes);
        });
      } else util.sendApiRes(res, tv.result);
    });
  } else util.sendApiRes(res, vds.result);
}

module.exports = {
  postB2bH1BPtnFlwupCreate, getB2bH1BPtnFlwupsList, putB2bH1BPtnFlwupUpdate
};
