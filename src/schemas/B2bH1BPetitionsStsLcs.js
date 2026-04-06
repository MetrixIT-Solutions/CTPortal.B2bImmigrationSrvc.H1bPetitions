/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2024
 */

var config = require('config');
var mongoose = require('mongoose');
var {v4: uuidv4} = require('uuid');

mongoose.createConnection(config.mongoDBConnection);
const Schema = mongoose.Schema;

// --- Begin: B2B Partners - Candidate H1BPetitions Status Lifecycles Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  petition: {type: String, required: true}, // B2bH1BPetition._id

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},
  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},

  obId: {type: String, required: false}, // Org Branch Record ID
  obName: {type: String, required: false}, // Org Branch Name
  obCode: {type: String, required: false}, // Org Branch Code
  team: {type: String, required: true},
  tName: {type: String, required: true}, // Team Name
  tCode: {type: String, required: true}, // Team Code
  searchStr: {type: String, required: true}, // Consultant Name<#$>Stem OPT;

  report: {type: String, required: true},
  rprtName: {type: String, required: true},
  rprtPrimary: {type: String, required: true},
  pReports: {type: [String], required: true}, // Parent Reports

  euUser: {type: String, required: true},
  euName: {type: String, required: true},
  euMobCcNum: {type: String, required: false}, // Mobile Number with Country Code
  euEmID: {type: String, required: true, trim: true}, // Email ID
  euUID: {type: String, required: true}, // Reference Unique ID
  euPrimary: {type: String, required: true}, // Mobile Number or Email

  pId: {type: String, required: true}, // Petition Id - Generated
  pcNum: {type: String, required: true}, // Petition Case Number - Generated and Editable
  pType: {type: String, required: true}, // Petition Type: Cap Petition, Extension, Extension + Amendment, Amendment, Transfer
  pNotes: {type: String, required: false}, // Petition Notes
  pDate: {type: Date, required: true}, // Applied Date
  pStatus: {type: String, required: true}, // Open, Review(Verified), Submitted(Approved, Denied, RFE)
  psNotes: {type: String, required: false}, // Petition Status Notes
  
  wrkUrls: {type: [String], required: false, default: []},

  executive: {type: String, required: false},
  attorney: {type: String, required: false},

  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({cDtStr: -1});

module.exports = mongoose.model(config.collB2bH1BPetitionsStsLcs, schema);
// --- End: B2B Partners - Candidate H1BPetitions Status Lifecycles Schema --- //
