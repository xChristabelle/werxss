import express from "express";
import index, {
  showUser,
  storeUser,
  updateUser,
  destroyUser,
  getCDAList,
  getCDA,
  storeCDA,
  updateCDA,
  destroyCDA,
  storeAgent,
  getAgentsList,
  storeMarketingCenter,
  storeTransactionType,
  storePropertyType,
  storePropertyStatus,
  storeSource
} from "../controllers/management.js";
import upload from "../middleware/upload.js";

const router = express.Router();

//User
router.get("/", index);
router.get("/show/:id", showUser);
router.post("/store", upload.single("image"), storeUser);
router.post("/update", updateUser);
router.post("/delete", destroyUser);

//Agent
router.post("/store-agent", upload.single("image"), storeAgent);
router.get("/show-agent-list", getAgentsList);

//CDA
router.get("/show-cda-list", getCDAList);
router.get("/show-cda/:id", getCDA);
// router.post("/store-cda", upload.array("file[]"), storeCDA);
router.post("/store-cda", upload.single("file"), storeCDA);
router.post("/update-cda", updateCDA);
router.post("/delete-cda", destroyCDA);

//Marketing Center
router.post("/store-marketing-center", upload.single("image"), storeMarketingCenter);

//Transaction Type
router.post("/store-transaction-type", upload.single("image"), storeTransactionType);

//Property Type
router.post("/store-property-type", upload.single("image"), storePropertyType);

//Property Status
router.post("/store-property-status", upload.single("image"), storePropertyStatus);

//Source
router.post("/store-source", upload.single("image"), storeSource);

export default router;
