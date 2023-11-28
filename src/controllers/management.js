import { getFileStream, uploadFile, uploadFiles } from "../middleware/s3.js";
import { generatePass } from "../middleware/password_generator.js";
import fs from "fs";
import util from "util";
import User from "../models/User.js";
import UserInformation from "../models/UserInformation.js";
import Company from "../models/Company.js";
import Agent from "../models/Agents.js";
import AgentGoals from "../models/AgentGoals.js";
import CDA from "../models/CDA.js";
import MarketingCenter from "../models/MarketingCenter.js";
import TransactionType from "../models/TransactionType.js";
import PropertyType from "../models/PropertyType.js";
import PropertyStatus from "../models/PropertyStatus.js";
import Source from "../models/Source.js";

const unlinkFile = util.promisify(fs.unlink);

// Show list of Users
export default async function index(req, res, next) {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Show single User
export const showUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add user
export const storeUser = async (req, res, next) => {
  let user = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    // dateOfBirth: req.body.dateOfBirth,
    // joinRealEmail: req.body.joinRealEmail,
    // licenseNumber: req.body.licenseNumber,
    // licenseExpirationDate: req.body.licenseExpirationDate,
    // website: req.body.website,
    // sponsorLink: req.body.sponsorLink,
    // shareworksId: req.body.shareworksId,
    // password: req.body.password,
    // address: req.body.address,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip,
    // country: req.body.country,
    // position: req.body.country,
    // countryCode: req.body.countryCode,
    // phoneNumber: req.body.phoneNumber,
    // transactions: req.body.transactions,
  });

  // console.log("🚀 ~ file: management.js:59 ~ storeUser ~ req:", req.files)
  if (req.file) {
    user.image = req.file.path.substring(8);

    try {
      result = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      console.log(result);
    } catch (error) {
      console.error("Error uploading files to S3:", error);
      // Handle the error as needed
    }
  }

  user
    .save()
    .then((response) => {
      res.json({
        message: "User Added Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "User not Successfully Added, An error Occured!",
      });
    });
};

// Update a user
export const updateUser = (req, res, next) => {
  let userId = req.body.userId;

  let updatedData = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    // joinRealEmail: req.body.joinRealEmail,
    // licenseNumber: req.body.licenseNumber,
    // licenseExpirationDate: req.body.licenseExpirationDate,
    // website: req.body.website,
    // sponsorLink: req.body.sponsorLink,
    // shareworksId: req.body.shareworksId,
    // email: req.body.email,
    // password: req.body.password,
    // address: req.body.address,
    // city: req.body.city,
    // state: req.body.state,
    // zip: req.body.zip,
    // country: req.body.country,
    // position: req.body.country,
    // countryCode: req.body.countryCode,
    // phoneNumber: req.body.phoneNumber,
    // transactions: req.body.transactions,
  };

  User.findByIdAndUpdate(userId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "User Updated Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "User not Successfully Updated, An error Occured!",
      });
    });
};

// Delete a user
export const destroyUser = (req, res, next) => {
  let userId = req.body.userId;
  User.findOneAndRemove(userId)
    .then(() => {
      res.json({
        message: "User Removed Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "User not Successfully Removed, An error Occured!",
      });
    });
};

// Show list of Agents
export const getAgentsList = async (req, res, next) => {
  try {
    // Fetch a list of agents from the database
    const agents = await Agent.find();

    // Create an array to store agent information
    const agentInfoList = [];

    for (const agent of agents) {
      // For each agent, fetch associated user and user information
      const user = await User.findOne({ _id: agent.userId });
      const userInformation = await UserInformation.findOne({
        userId: agent.userId,
      });
      const company = await Company.findOne({ _id: user.company.id });

      // Create an object with agent, user, and user information
      const agentInfo = {
        agent,
        user,
        userInformation,
        company,
      };

      // Add the agent info to the list
      agentInfoList.push(agentInfo);
    }

    res.status(200).json(agentInfoList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Add Agent
export const storeAgent = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: management.js:155 ~ storeAgent ~ req:", req.body);

    const company = await Company.findById(req.body.companyId);
    console.log(
      "🚀 ~ file: management.js:159 ~ storeAgent ~ company:",
      company
    );

    let user = new User({
      username: req.body.email,
      password: generatePass(),
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
      role: "user",
    });

    let userInformation = new UserInformation({
      userId: user._id,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      email: req.body.email,
      dre: req.body.dre,
      phoneNumber: req.body.phoneNumber,
      createdBy: req.body.userId,
    });

    let agent = new Agent({
      userId: user._id,
      createdBy: req.body.userId,
    });

    let agentGoals = new AgentGoals({
      agentId: agent._id,
      closingGoal: req.body.closingGoal,
      volumeGoal: req.body.volumeGoal,
      createdBy: req.body.userId,
    });

    await user.save();
    await userInformation.save();
    await agent.save();
    await agentGoals.save();

    res.json({
      message: "Agent Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Agent not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

// Display all list CDA
export async function getCDAList(req, res, next) {
  try {
    const cda = await CDA.find();
    res.status(200).json(cda);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Display single CDA
export const getCDA = async (req, res) => {
  try {
    const { id } = req.params;
    const cda = await CDA.findById(id);
    const getCDA = await getFileStream(cda.document.fileURL);
    cda.document.fileURL = getCDA;
    res.status(200).json(cda);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add CDA
export const storeCDA = async (req, res, next) => {
  let result = "";
  let cda = new CDA({
    adminId: req.body.userId,
    agentId: req.body.agentId,
    name: req.body.name,
  });

  if (req.file) {
    cda.document.fileURL = req.file.path.substring(8);

    try {
      result = await uploadFile(req.file);
      unlinkFile(req.file.path);
      console.log("🚀 ~ file: management.js:197 ~ storeCDA ~ result:", result);
    } catch (error) {
      console.error("Error uploading files to S3:", error);
      // Handle the error as needed
    }
  }

  cda
    .save()
    .then((response) => {
      res.json({
        message: "CDA Added Successfully!",
        isSuccess: true,
        imagePath: `/images/${result}`,
      });
    })
    .catch((error) => {
      res.json({
        message: "CDA not Successfully Added, An error Occured!",
        isSuccess: false,
      });
    });
};

// Update a CDA
export const updateCDA = (req, res, next) => {
  let cdaId = req.body.cdaId;

  let updatedData = {
    userId: req.body.userId,
  };

  CDA.findByIdAndUpdate(cdaId, { $set: updatedData })
    .then(() => {
      res.json({
        message: "User Updated Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "User not Successfully Updated, An error Occured!",
      });
    });
};

// Delete a CDA
export const destroyCDA = (req, res, next) => {
  let cdaId = req.body.cdaId;
  CDA.findOneAndRemove(cdaId)
    .then(() => {
      res.json({
        message: "User Removed Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "User not Successfully Removed, An error Occured!",
      });
    });
};

//Add Marketing Center
export const storeMarketingCenter = async (req, res, next) => {
  try {
    const company = await Company.findById(req.body.companyId);

    let marketingCenter = new MarketingCenter({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    if (req.file) {
      marketingCenter.image = req.file.path.substring(8);

      try {
        await uploadFile(req.file);
        await unlinkFile(req.file.path);
      } catch (error) {
        console.error("Error uploading files to S3:", error);
        // Handle the error as needed
      }
    }

    await marketingCenter.save();

    res.json({
      message: "Management Center Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Management Center not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

//Add Transaction Type
export const storeTransactionType = async (req, res, next) => {
  try {
    const company = await Company.findById(req.body.companyId);

    let transactionType = new TransactionType({
      name: req.body.name,
      description: req.body.description,
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    await transactionType.save();

    res.json({
      message: "Transaction Type Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Transaction Type not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

//Add Property Type
export const storePropertyType = async (req, res, next) => {
    console.log("🚀 ~ file: management.js:423 ~ storePropertyType ~ req.body:", req.body)
    try {
    const company = await Company.findById(req.body.companyId);

    let propertyType = new PropertyType({
      name: req.body.name,
      description: req.body.description,
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    await propertyType.save();

    res.json({
      message: "Property Type Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Property Type not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

//Add Property Status
export const storePropertyStatus = async (req, res, next) => {
  try {
    const company = await Company.findById(req.body.companyId);

    let propertyStatus = new PropertyStatus({
      name: req.body.name,
      description: req.body.description,
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    await propertyStatus.save();

    res.json({
      message: "Property Status Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Property Status not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};

//Add Source
export const storeSource = async (req, res, next) => {
  try {
    const company = await Company.findById(req.body.companyId);

    let source = new Source({
      name: req.body.name,
      description: req.body.description,
      company: {
        id: req.body.companyId,
        name: company.name,
      },
      createdBy: req.body.userId,
    });

    await source.save();

    res.json({
      message: "Source Added Successfully!",
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      message: "Source not Successfully Added, An error Occured!",
      isSuccess: false,
      error: error,
    });
  }
};
