/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const SetRes = require('../SetRes');
const logger = require('../lib/logger');
const { uniq } = require('../consts/B2bH1BPetitionsConsts.json');
const B2bH1BPetitions = require('../schemas/B2bH1BPetitions');
const B2bH1BPetitionsStsLcs = require('../schemas/B2bH1BPetitionsStsLcs');

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
    if (error.keyPattern && error.keyPattern.pId) {
      logger.error('Uniqueness(Petition Id) Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq.ptnErr);
      callback(err);
    } else if (error.keyPattern && error.keyPattern.pcNum) {
      logger.error('Uniqueness(Petition Case Number) Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq.pcNumErr);
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getB2bH1BPetitionsList = (query, body, callback) => {
  const { pgNum, limit } = body;
  let resultObj = { petitionsListCount: 0, petitionsList: [] };
  B2bH1BPetitions.find(query).skip((pgNum - 1) * limit).limit(limit).sort({priority: 1, uDtStr: -1}).then((resObj) => {
    if (resObj && resObj.length > 0) {
      petitionsTotalCount(query, resObj, callback);
    } else {
      const noData = SetRes.noData(resultObj);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at getB2bH1BPetitionsList:' + error);
    const err = SetRes.unKnownErr(resultObj);
    callback(err);
  });
}

const petitionsAggregateQuery = (query, callback) => {
  B2bH1BPetitions.aggregate(query).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at petitionsAggregateQuery:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

const updateB2bPetition = (query, updateObj, callback) => {
  B2bH1BPetitions.findOneAndUpdate(query, updateObj, { new: true }).then((resObj) => {
    if (resObj && resObj._id) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const uf = SetRes.updateFailed({});
      callback(uf);
    }
  }).catch((error) => {
    if (error.keyPattern && error.keyPattern.pId) {
      logger.error('Uniqueness(Petition Id) Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq.ptnErr);
      callback(err);
    } else if (error.keyPattern && error.keyPattern.pcNum) {
      logger.error('Uniqueness(Petition Case Number) Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.uniqueErr(uniq.pcNumErr);
      callback(err);
    } else {
      logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at commonCreateFunc:' + error);
      const err = SetRes.unKnownErr({});
      callback(err);
    }
  });
}

const getB2bH1BPetitionStsLfcsList = (query, callback) => {
  B2bH1BPetitionsStsLcs.find(query).sort({ cDtStr: -1 }).then((resObj) => {
    if (resObj && resObj.length > 0) {
      const result = SetRes.successRes(resObj);
      callback(result);
    } else {
      const noData = SetRes.noData([]);
      callback(noData);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at getB2bH1BPetitionStsLfcsList:' + error);
    const err = SetRes.unKnownErr([]);
    callback(err);
  });
}

module.exports = {
  commonCreateFunc, getB2bH1BPetitionsList, petitionsAggregateQuery, updateB2bPetition, getB2bH1BPetitionStsLfcsList
};

const petitionsTotalCount = (query, resObj, callback) => {
  let resultObj = { petitionsListCount: resObj.length, petitionsList: resObj };
  B2bH1BPetitions.countDocuments(query).then((resultCount) => {
    if (resultCount) {
      resultObj = { petitionsListCount: resultCount, petitionsList: resObj };
      const result = SetRes.successRes(resultObj);
      callback(result);
    } else {
      const result = SetRes.successRes(resultObj);
      callback(result);
    }
  }).catch((error) => {
    logger.error('Un-known Error in daos/B2bH1BPetitionsDaos.js, at petitionsTotalCount:' + error);
    const result = SetRes.successRes(resultObj);
    callback(result);
  });
}