import { User } from "../models/userModel";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Types } from "mongoose";

import * as jwt from "jsonwebtoken";

const createToken = (_id: Types.ObjectId) => {
  return jwt.sign({ _id }, `${process.env.SECRET}`, { expiresIn: "3d" });
};

// signup user
const signupUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, token, id: user._id });
  } catch (e) {
    res.status(400).json({ error: "User signup failed" });
  }
};

// login user
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};

// get all users
const getUsers = async (req: Request, res: Response) => {
  const users = await User.find().exec();

  res.status(200).json(users);
};

// get one user
const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  /* 
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id not valid" });
  } */

  const user = await User.findOne({ username: username }).exec();
  
  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

//  delete user

const deleteUser = async (req: Request, res: Response) => {
  if (req.user == null) {
    return res.status(400).json({ error: "Id not valid" });
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  const user = await User.findOneAndDelete({ _id: req.user.id }).exec();

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json({ detail: "User successfully deleted" });
};

// update lang and group
const updateLangandGroup = async (req: Request, res: Response) => {
  const { lang, groups } = req.body;

  if (req.user == null) {
    return res.status(400).json({ error: "Id not valid" });
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      lang,
      groups,
    },
    { new: true }
  ).exec();

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

// update lang and group
const addFriend = async (req: Request, res: Response) => {
  const { friend } = req.params;

  if (req.user == null) {
    return res.status(400).json({ error: "Id not valid" });
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  const friendDb = await User.findOne({ username: friend }).exec();

  if (!friendDb) {
    return res.status(404).json({ error: "Friend doesn't exist." });
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $push: { friends: friend },
    },
    { new: true }
  ).exec();

  res.status(200).json(user);
};

// get list of friends

const getFriends = async (req: Request, res: Response) => {
  if (req.user == null) {
    return res.status(400).json({ error: "Id not valid" });
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  const user = await User.find({ _id: req.user.id }, "friends").exec();

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

// get list of groups of user
const getGroups = async (req: Request, res: Response) => {
  if (req.user == null) {
    return res.status(400).json({ error: "Id not valid" });
  }

  if (!Types.ObjectId.isValid(req.user.id)) {
    return res.status(400).json({ error: "Id not valid" });
  }

  const user = await User.find({ _id: req.user.id }, "groups").exec();

  if (!user) {
    return res.status(404).json({ error: "No such User" });
  }

  res.status(200).json(user);
};

export {
  addFriend,
  getUser,
  getFriends,
  getGroups,
  getUsers,
  signupUser,
  loginUser,
  deleteUser,
  updateLangandGroup,
};
