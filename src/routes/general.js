import express from "express";
import {
  getUser,
  storeUser,
  getPropertiesList,
  getProperties,
  storeProperties,
  updateProperties,
  destroyProperties,
  getMarketingCenterList,
  getTransactionTypeList,
  getPropertyTypeList,
  getPropertyStatusList,
  getSourceList,
  storeNewsfeed,
  getNewsfeed,
} from "../controllers/general.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/add-user", upload.single("image"), storeUser);

router.get("/show-properties-list", getPropertiesList);
router.get("/show-properties/:id", getProperties);
router.post("/store-properties", upload.single("image"), storeProperties);
router.post("/update-properties", updateProperties);
router.post("/delete-properties", destroyProperties);

router.get("/show-marketing-center", getMarketingCenterList);

router.get("/show-transaction-type", getTransactionTypeList);
router.get("/show-property-type", getPropertyTypeList);
router.get("/show-property-status", getPropertyStatusList);
router.get("/show-source", getSourceList);

router.post("/add-newsfeed", upload.single("image"), storeNewsfeed);
router.get("/show-newsfeed", getNewsfeed);

export default router;
