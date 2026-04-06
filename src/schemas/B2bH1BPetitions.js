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

// --- Begin: B2B Partners - Candidate H1BPetitions Schema --- //
const schema = new Schema({
  _id: {type: String, default: uuidv4()},
  idSeq: {
    seq: {type: String, required: true}, //  Year(2022) Month(10) Day(10)
    year: {type: Number, required: true},
    month: {type: Number, required: true},
    day: {type: Number, required: true}
  },

  b2b: {type: String, required: true},
  b2bName: {type: String, required: true},
  b2bCode: {type: String, required: true},
  org: {type: String, required: true},
  orgName: {type: String, required: true},
  orgCode: {type: String, required: true},

  refType: {type: String, required: true}, // Refer Type: Internal, Other
  refByUser: {type: String, required: false}, // Referred By User(_id): Required true if refType = Internal
  refByUID: {type: String, required: false}, // Referred By User(refUID): Required true if refType = Internal
  refByName: {type: String, required: true}, // Referred By User(Name)

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
  ppApproved: {type: Boolean, default: false}, // Petition Profile Approved - For New Beneficiary initially false, after Profile Approved it is true. For Existing by default true
  pVerified: {type: String, default: 'NA'}, // Verified: Once Candidate Completed all Checklist data, then it is Verified
  psStatus: {type: String, default: 'NA'}, // Petition Submission Status: NA, Submitted, Approved, Denied, RFE

  wrkUrls: {type: [String], required: false, default: []},

  executive: {type: String, required: false},
  attorney: {type: String, required: false},

  temp: [{
    _id: {type: String, required: false}, // Template _id
    tempCat: {type: String, required: false},
    tempName: {type: String, required: false},
    urID: {type: String, required: false}, // User Role: _id
    userRole: {type: String, required: false}, // User Role: rName
    urSeq: {type: Number, required: false}, // User Role Sequence: rSeq
    tdCount: {type: Number, default: 0}, // Template Data Count
    tdoCount: {type: Number, default: 0}, // Template Data Organization Count
    tdcCount: {type: Number, default: 0}, // Template Data Consultants Count
    tdpCount: {type: Number, default: 0}, // Template Data Provided Count
    tdaCount: {type: Number, default: 0}, // Template Data Approved Count
  }],

  priority: {type: String, default: '999'}, // High: 031, Medium: 051, Low: 071

  delFlag: {type: Boolean, default: false}, // Deleted Flag
  cuType: {type: String, required: true}, // Created User Type
  cUser: {type: String, required: true, trim: true}, // Created Users._id
  cuName: {type: String, required: true}, // Created Users.pName
  cDate: {type: Date, required: true}, // Date & Time
  cDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
  uuType: {type: String, required: true}, // Updated User Type
  uUser: {type: String, required: true, trim: true}, // Updated Users._id
  uuName: {type: String, required: true}, // Updated Users.pName
  uDate: {type: Date, required: true}, // Date & Time
  uDtStr: {type: String, required: true}, // Date & Time String - Format = YYYY-MM-DD HH:mm:ss
});

schema.index({searchStr: 'text'});
schema.index({b2b: 1, pId: 1}, {unique: true});
schema.index({b2b: 1, org: 1, pcNum: 1}, {unique: true});
schema.index({euUser: 1, b2b: 1, org: 1, delFlag: -1});
schema.index({pReports: 1, pStatus: 1, b2b: 1, org: 1, delFlag: -1});
schema.index({team: 1, pStatus: 1, b2b: 1, org: 1, delFlag: -1});
schema.index({priority: 1, pDate: 1, uDtStr: -1});

module.exports = mongoose.model(config.collB2bH1BPetitions, schema);
// --- End: B2B Partners - Candidate H1BPetitions Schema --- //
