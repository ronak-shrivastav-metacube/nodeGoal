import express from 'express';
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

// Projects Routes
router.get("/project/add",Project.companyAdd);
router.post("/project/add",Project.companyAdd);
router.get("/project/all",Project.companyShowAll);

// Prospects Routes
router.get("/prospect/add",Prospect.companyAdd);
router.post("/prospect/add",Prospect.companyAdd);
router.get("/prospect/all",Prospect.companyShowAll);

export default router;