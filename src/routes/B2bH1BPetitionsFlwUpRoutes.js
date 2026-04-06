/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bh1bFlwUpCtrl = require('../controllers/B2bH1BPetitionsFlwUpCtrl');

module.exports.controller = (app) => {

  app.post('/ctpb2b/v1/eusr/h1bpetition/followup/create', bh1bFlwUpCtrl.postB2bH1BPtnFlwupCreate);
  app.get('/ctpb2b/v1/eusr/h1bpetition/followups/list/:petition', bh1bFlwUpCtrl.getB2bH1BPtnFlwupsList);
  app.put('/ctpb2b/v1/eusr/h1bpetition/followup/update/:recordId', bh1bFlwUpCtrl.putB2bH1BPtnFlwupUpdate);

};
