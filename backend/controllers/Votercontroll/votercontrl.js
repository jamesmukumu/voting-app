const Voter = require("../../schemas/voters/votermodel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
//job scheduler node crom
const nodecron = require("node-cron");

function generatenewOtp() {
  return crypto.randomBytes(8).toString("hex");
}

// auto replace expired passkey
async function replacePasskey(req, res) {
  try {
    const votersToUpdate = await Voter.findAll({
      where: { id: { [Sequelize.Op.lt]: 1000 } },
    });

    for (const voter of votersToUpdate) {
      const newOtps = generatenewOtp();
      await voter.update({ voterPasskey: newOtps });
    }

    return res.status(200).json({ message: "Passkeys have been updated" });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//schedule with node cron to autochange the value after evry second
nodecron.schedule("0 0 * * * *", replacePasskey);

//generate a unique string
function generateOtp() {
  return crypto.randomBytes(8).toString("hex");
}
const otp = generateOtp();

const transpoter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  host: "smtp.gmail.com",

  auth: {
    user: process.env.user,
    pass: process.env.gpassword,
  },
});

//post Voter

async function postVoterandsentvoterpasskey(req, res) {
  const inputemail = req.body.email;
  try {
    const voter = new Voter({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      phoneNumber: req.body.phoneNumber,
      idNumber: req.body.idNumber,
      email: inputemail,
      voterPasskey: otp,
    });
    const result = await voter.save();

    const mailoptions = {
      from: process.env.user,
      to: inputemail,
      subject: "Your PassKey",
      html: `Thanks For registering to the PJ voting system.Your voter passkey is <span style="color:green;">${voter.voterPasskey}</span> and is valid for only one HR.<a href="https://iebc-1576e.web.app/">Vote here</a>`,
    };
    transpoter.sendMail(mailoptions);

    return res.status(200).json({ message: "voter registration pass" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(500).json({ error: "field must be unique" });
    } else {
      return res.status(500).json({ error: `${error}` });
    }
  }
}

//find a passkey in the db
async function validatePasskey(req, res) {
  try {
    const secret = process.env.jwtsecret;
    const passkey = req.body.voterPasskey;
    const token = jwt.sign({ passkey }, secret, { expiresIn: "1h" });
    const matchingPasskey = await Voter.findOne({
      where: { voterPasskey: passkey },
    });
    if (!matchingPasskey) {
      return res.status(200).json({ message: "No matching pass key" });
    } else if (matchingPasskey) {
      return res
        .status(200)
        .setHeader("Authorization", token)
        .json({ message: "Passkey found", token });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

//count voters registred

async function countVoters(req, res) {
  try {
    const countedUsers = await Voter.count();
    if (countVoters === 0) {
      return res.status(200).json({message:"null voters",data:0});
    } else {
      return res.status(200).json({message:"all voter",data:countedUsers});
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

//fetch all emails in the db

async function fetchAllemails(req, res) {
  try {
    const allemails = await Voter.findAll({
      attributes: ["email"],
    });

    if (allemails.length === 0) {
      return res.status(200).json({ error: "No emails found" });
    } else {
      const allvoteremails = allemails.map((voter) => voter.email);
      // Pass allvoteremails as a parameter to propagateMail
      await propagateMail(req, res, allvoteremails);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// Send emails to all emails

async function propagateMail(req, res, allvoteremails) {
  try {
    const mailoptions = {
      from: process.env.user,
      to: allvoteremails.join(", "),
      subject: req.body.subject,
      html: req.body.html,
    };

    await transpoter.sendMail(mailoptions);
    return res.status(200).json({ message: "Emails sent" });
  } catch (error) {
    return res.status(500).json({ error: `the error is ${error}` });
  }
}

module.exports = {
  postVoterandsentvoterpasskey,
  validatePasskey,
  countVoters,
  fetchAllemails,
  propagateMail,
};
