/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bh1bPFlwUpDaoimpl = require('../daos/daosimpls/B2bH1BPetitionsFlwUpDaosImpl');
const bh1bPFlwUpDao = require('../daos/B2bH1BPetitionsFlwUpDaos');

const postB2bH1BPtnFlwupCreate = (reqBody, tData, callback) => {
  const obj = bh1bPFlwUpDaoimpl.createFlwupObj(reqBody, tData);
  bh1bPFlwUpDao.commonCreateFunc(obj, callback);
}

const getB2bH1BPtnFlwupsList = (petition, tData, callback) => {
  const obj = bh1bPFlwUpDaoimpl.flwupsListQry(petition, tData);
  bh1bPFlwUpDao.getB2bH1BPtnFlwUpsList(obj, callback);
}

const putB2bH1BPtnFlwupUpdate = (recordId, reqBody, tData, callback) => {
  const qry = bh1bPFlwUpDaoimpl.getFlwUpQry(recordId, tData.b2b);
  const upObj = bh1bPFlwUpDaoimpl.updateFlwUpQry(reqBody, tData);
  bh1bPFlwUpDao.updateB2bPtnFlwUp(qry, upObj, callback);
}

module.exports = {
  postB2bH1BPtnFlwupCreate, getB2bH1BPtnFlwupsList, putB2bH1BPtnFlwupUpdate
};

