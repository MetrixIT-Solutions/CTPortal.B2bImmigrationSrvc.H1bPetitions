/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const B2bH1BPtnsFlwUps = require('../schemas/B2BH1BPetitionsFollowups');

const commonCreateFunc = (createObj, callback) => {
  createObj.save().then((resObj) => {
    if (resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const sf = SetRes.createFailed({});
      callback(sf);
    }
  }).catch((error) => {
      logger.error('Un-known Error in daos/B2bH1BPetitionsFollowupsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
  });
}

const getB2bH1BPtnFlwUpsList = (query, callback) => {
  B2bH1BPtnsFlwUps.find(query).sort({cDtStr: -1}).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bH1BPetitionsFollowupsDaos.js, at getB2bH1BPtnFlwUpsList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const updateB2bPtnFlwUp = (query, updateObj, callback) => {
  B2bH1BPtnsFlwUps.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
      logger.error('Un-known Error in daos/B2bH1BPetitionsFollowupsDaos.js, at updateB2bPtnFlwUp:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
  });
}

module.exports = {
  commonCreateFunc, getB2bH1BPtnFlwUpsList, updateB2bPtnFlwUp
};
