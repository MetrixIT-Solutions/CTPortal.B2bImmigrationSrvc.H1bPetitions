/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const async = require('async');

const bh1bPDao = require('../../daos/B2bH1BPetitionsDaos');
const SetRes = require('../../SetRes');
const logger = require('../../lib/logger');

const getB2PetitionsListWithAsync = (matchQuery, countQuery, reqBody, callback) => {
  async.parallel([
    function (cb1) {
      bh1bPDao.getB2bH1BPetitionsList(matchQuery, reqBody, (resObj1) => {
        cb1(null, resObj1.resData.result);
      });
    },
    function (cb2) {
      bh1bPDao.petitionsAggregateQuery(countQuery, (resObj2) => {
        cb2(null, resObj2.resData.result);
      });
    },
  ], function (err, result) {
    if (err) {
      logger.error('There was an Un-known Error occured in daos/B2bH1BPetitionsSrvcImpl.js' + 'at getB2PetitionsListWithAsync:' + err);
    }
    let resArr = {}
    if (result) {
      resArr = { petitionsListCount: result[0].petitionsListCount, petitionsList: result[0].petitionsList, petitionsCountByStatus: result[1] }
    } else {
      resArr = { petitionsListCount: result[0].petitionsListCount, petitionsList: result[0].petitionsList, petitionsCountByStatus: result[1] };
    }
    callback(SetRes.successRes(resArr));
  });
}

module.exports = {
  getB2PetitionsListWithAsync
};
