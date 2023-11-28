import { getFileStream, uploadFile } from "../middleware/s3.js";
import fs from "fs";
import util from "util";
import User from "../models/User.js";
import UserInformation from "../models/UserInformation.js";
import Company from "../models/Company.js";
import Agents from "../models/Agents.js";
import Properties from "../models/Properties.js";
import MarketingCenter from "../models/MarketingCenter.js";
import TransactionType from "../models/TransactionType.js";
import PropertyType from "../models/PropertyType.js";
import PropertyStatus from "../models/PropertyStatus.js";
import Source from "../models/Source.js";
import Newsfeed from "../models/Newsfeed.js";

const unlinkFile = util.promisify(fs.unlink);

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const userInformation = await UserInformation.findOne({ userId: id });
    res.status(200).json({ user, userInformation });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Add User
export const storeUser = async (req, res, next) => {
  try {
    let user = new User({
      username: req.body.email,
      password: req.body.password,
      company: {
        name: req.body.companyName,
      },
      role: "admin",
    });

    user.createdBy = user._id;

    let userInformation = new UserInformation({
      userId: user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      createdBy: user._id,
    });

    let company = new Company({
      name: req.body.companyName,
      address: {
        street: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        country: "United States of America",
      },
      dre: req.body.dre,
      phoneNumber: req.body.phoneNumber,
      createdBy: user._id,
    });

    if (req.file) {
      company.logo = req.file.path.substring(8);
      try {
        await uploadFile(req.file);
        await unlinkFile(req.file.path);
      } catch (error) {
        console.error("Error uploading files to S3:", error);
        // Handle the error as needed
      }
    }

    user.company.id = company._id;

    await user.save();
    await userInformation.save();
    await company.save();

    res.json({
      message: "User Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "User not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

// Show list of Properties
export const getPropertiesList = async (req, res, next) => {
  try {
    const properties = await Properties.find();

    const propertiesInfoList = [];

    for (const property of properties) {
      const agent = await Agents.findOne({ _id: property.agentId });
      const user = await User.findOne({ _id: agent.userId });
      const userInformation = await UserInformation.findOne({
        userId: agent.userId,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const propertiesInfo = {
        property,
        agent,
        user,
        userInformation,
        company,
      };
      propertiesInfoList.push(propertiesInfo);
    }

    res.status(200).json(propertiesInfoList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Show single Properties
export const getProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const properties = await Properties.findById(id);
    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Add Properties
export const storeProperties = (req, res, next) => {
  let properties = new Properties({
    userId: req.body.userId,
    mlsNumber: req.body.mlsNumber,
    transactionType: req.body.transactionType,
    propertyType: req.body.propertyType,
    propertyStatus: req.body.propertyStatus,
    street: req.body.street,
    city: req.body.city,
    state: {
      name: req.body.states,
      abbr: req.body.statesAbbr,
    },
    postalCode: req.body.postalCode,
    salesPrice: req.body.salesPrice,
    units: req.body.units,
    commission: req.body.commission,
    bonus: req.body.bonus,
    source: req.body.source,
    transactionCoordinatorFee: req.body.transactionCoordinatorFee,
    splitPaid: req.body.splitPaid,
    officeFees: req.body.officeFees,
    agentId: req.body.agentId,
    escrowCompany: req.body.escrowCompany,
    mortgageCompany: req.body.mortgageCompany,
    contractStartDate: req.body.contractStartDate,
    contractExpirationDate: req.body.contractExpirationDate,
    openEscrowDate: req.body.openEscrowDate,
    closingDate: req.body.closingDate,
  });

  //for array / multiple
  if (req.file) {
    properties.image = req.file.path.substring(8);
  }

  properties
    .save()
    .then((response) => {
      res.json({
        message: "Properties Added Successfully!",
        isSuccess: true,
      });
    })
    .catch((error) => {
      res.json({
        message: "Properties not Successfully Added, An error Occured!",
        isSuccess: false,
      });
    });
};

// Update a Properties
export const updateProperties = (req, res, next) => {
  let propertiesId = req.body.propertiesId;

  let updatedData = {
    mlsNumber: req.body.mlsNumber,
    transactionType: req.body.transactionType,
    propertyType: req.body.propertyType,
    propertyStatus: req.body.propertyStatus,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    salesPrice: req.body.salesPrice,
    units: req.body.units,
    commission: req.body.commission,
    bonus: req.body.bonus,
    source: req.body.source,
    transactionCoordinatorFee: req.body.transactionCoordinatorFee,
    splitPaid: req.body.splitPaid,
    officeFees: req.body.officeFees,
    agent: req.body.agent,
    escrowCompany: req.body.escrowCompany,
    mortgageCompany: req.body.mortgageCompany,
    contractStartDate: req.body.contractStartDate,
    contractExpirationDate: req.body.contractExpirationDate,
    openEscrowDate: req.body.openEscrowDate,
    closingDate: req.body.closingDate,
  };

  Properties.findByIdAndUpdate(propertiesId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Properties Updated Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "Properties not Successfully Updated, An error Occured!",
      });
    });
};

// Delete a Properties
export const destroyProperties = (req, res, next) => {
  let propertiesId = req.body.propertiesId;
  Properties.findOneAndRemove(propertiesId)
    .then(() => {
      res.json({
        message: "Properties Removed Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "Properties not Successfully Removed, An error Occured!",
      });
    });
};

// Show list of Marketing Center List
export const getMarketingCenterList = async (req, res, next) => {
  try {
    const marketingCenter = await MarketingCenter.find();

    const marketingCenterList = [];

    for (const marketing of marketingCenter) {
      const user = await User.findOne({ _id: marketing.createdBy });
      const getMarketingImage = await getFileStream(marketing.image);
      marketing.image = getMarketingImage;
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const marketingCenterInfo = {
        marketing,
        user,
        userInformation,
        company,
      };
      marketingCenterList.push(marketingCenterInfo);
    }

    res.status(200).json(marketingCenterList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Show list of Transaction Type List
export const getTransactionTypeList = async (req, res, next) => {
  try {
    const transactionType = await TransactionType.find();

    const transactionTypeList = [];

    for (const transaction of transactionType) {
      const user = await User.findOne({ _id: transaction.createdBy });
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const transactionTypeInfo = {
        transaction,
        user,
        userInformation,
        company,
      };
      transactionTypeList.push(transactionTypeInfo);
    }

    res.status(200).json(transactionTypeList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Show list of Property Type List
export const getPropertyTypeList = async (req, res, next) => {
  try {
    const propertyType = await PropertyType.find();

    const propertyTypeList = [];

    for (const property of propertyType) {
      const user = await User.findOne({ _id: property.createdBy });
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const propertyTypeInfo = {
        property,
        user,
        userInformation,
        company,
      };
      propertyTypeList.push(propertyTypeInfo);
    }

    res.status(200).json(propertyTypeList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Show list of Property Status List
export const getPropertyStatusList = async (req, res, next) => {
  try {
    const propertyStatus = await PropertyStatus.find();

    const propertyStatusList = [];

    for (const property of propertyStatus) {
      const user = await User.findOne({ _id: property.createdBy });
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const propertyStatusInfo = {
        property,
        user,
        userInformation,
        company,
      };
      propertyStatusList.push(propertyStatusInfo);
    }

    res.status(200).json(propertyStatusList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Show list of Source List
export const getSourceList = async (req, res, next) => {
  try {
    const sources = await Source.find();

    const sourceList = [];

    for (const source of sources) {
      const user = await User.findOne({ _id: source.createdBy });
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const sourceInfo = {
        source,
        user,
        userInformation,
        company,
      };
      sourceList.push(sourceInfo);
    }

    res.status(200).json(sourceList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add Post and Comments - Newsfeed
export const storeNewsfeed = async (req, res, next) => {
  console.log("🚀 ~ file: general.js:392 ~ storeComments ~ req:", req.body);
  try {
    const user = await User.findById(req.body.userId);
    const company = await Company.findById(user.company.id);

    let newsfeed = new Newsfeed({
      _id: req.body._id,
      userId: req.body.userId,
      username: user.username,
      parentId:
        req.body.parentId == ""
          ? null
          : req.body.parentId == "null"
          ? null
          : req.body.parentId,
      body: req.body.body,
      company: {
        id: company._id,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    if (req.file) {
      newsfeed.image = req.file.path.substring(8);
      try {
        await uploadFile(req.file);
        await unlinkFile(req.file.path);
      } catch (error) {
        console.error("Error uploading files to S3:", error);
        // Handle the error as needed
      }
    }

    await newsfeed.save();

    res.json({
      message: "Comments Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    console.log("🚀 ~ file: general.js:432 ~ storeNewsfeed ~ error:", error);
    res.json({
      message: "Comments not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

// Show Comments - Newsfeed
export const getNewsfeed = async (req, res, next) => {
  try {
    const defaultLimit = 10;
    const defaultSkip = 0;

    let limit = parseInt(req.query.limit);
    limit = (isNaN(limit) || limit < 1) ? defaultLimit : limit;

    let skip = parseInt(req.query.skip);
    skip = (isNaN(skip) || skip < 0) ? defaultSkip : skip;

    const newsfeed = await Newsfeed.find({})
      .sort({ createdOn: -1 })
      .skip(skip)
      .limit(limit);

    const newsfeedList = [];

    for (const data of newsfeed) {
      const user = await User.findOne({ _id: data.createdBy });
      const userInformation = await UserInformation.findOne({
        userId: user._id,
      });
      const company = await Company.findOne({ _id: user.company.id });
      const newsfeedInfo = {
        data,
        user,
        userInformation,
        company,
      };
      newsfeedList.push(newsfeedInfo);
    }

    res.status(200).json(newsfeedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
