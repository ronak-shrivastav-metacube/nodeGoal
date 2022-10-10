import express, { Router } from 'express';
const router = express.Router();
import BaseController from '../controllers/BaseController';
import Company from '../controllers/company/company';
import Project from '../controllers/project/project';
import Prospect from '../controllers/prospect/prospect';
// Base URL
router.get("/",BaseController.welcome);

// Companies Routes
router.get("/company/add",Company.companyAdd);
router.post("/company/add",Company.companyAdd);
router.get("/company/all",Company.companyShowAll);
router.post("/company/find",Company.findCompany);
router.post("/company/update",Company.updateCompany);
router.post("/company/findRelatedProjects",Company.findRelatedProjects);

// Projects Routes
router.get("/project/add",Project.projectAdd);
router.post("/project/add",Project.projectAdd);
router.get("/project/all",Project.projectShowAll);
router.post("/project/find",Project.findProject);
router.post("/project/save",Project.updateProject);
// router.get("/project/edit/:id",Project.projectView);

// Prospects Routes
router.get("/prospect/add",Prospect.prospectAdd);
router.post("/prospect/add",Prospect.prospectAdd);
router.get("/prospect/all",Prospect.prospectShowAll);
router.post("/prospect/find",Prospect.prospectFind);
router.post("/prospect/updateStatus",Prospect.updateStatus);
router.post("/prospect/update",Prospect.updateProspect);

export default router;