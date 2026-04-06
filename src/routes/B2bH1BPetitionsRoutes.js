/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

const bh1bPCtrl = require('../controllers/B2bH1BPetitionsCtrl');

module.exports.controller = (app) => {

  app.get('/', bh1bPCtrl.apiServerStatus);
  
  app.post('/ctpb2b/v1/eusr/h1bpetition/create', bh1bPCtrl.postB2bH1BPetitionCreate);
  app.post('/ctpb2b/v1/eusr/h1bpetitions/list', bh1bPCtrl.getB2bH1BPetitionsList);
  app.put('/ctpb2b/v1/eusr/h1bpetition/status/update/:recordId', bh1bPCtrl.putB2bH1BPetitionStatusUpdate);
  app.put('/ctpb2b/v1/eusr/h1bpetition/update/case/:recordId', bh1bPCtrl.putB2bH1BPetitionUpdateCase);
  app.get('/ctpb2b/v1/eusr/h1bpetition/stslcs/list/:recordId', bh1bPCtrl.getB2bH1BPetitionStsLfcsList);
  app.put('/ctpb2b/v1/eusr/h1bpetition/update/priority/:recordId', bh1bPCtrl.putB2bH1BPetitionPriorityUpdate);
  app.put('/ctpb2b/v1/eusr/h1bpetition/ppaprvd/update/:recordId', bh1bPCtrl.putB2bH1BPpAprvdUpdate);
  app.post('/ctpb2b/v1/eusr/h1bpetition/template/count', bh1bPCtrl.postB2bH1BTempCount);
  app.delete('/ctpb2b/v1/eusr/h1bpetition/delete/:recordId', bh1bPCtrl.putB2bH1BPetitionDelete);

};
