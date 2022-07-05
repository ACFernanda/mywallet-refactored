import jwt from "jsonwebtoken";

import { financialEventsRepository } from "../repositories/financialEventsRepository.js";

export async function postFinantialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(422);
    }

    const financialTypes = ["INCOME", "OUTCOME"];
    if (!financialTypes.includes(type)) {
      return res.sendStatus(422);
    }

    if (value < 0) {
      return res.sendStatus(422);
    }

    await financialEventsRepository.insertFinancialEvent(user.id, value, type);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getFinantialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const events = await financialEventsRepository.selectFinancialEventsById(
      user.id
    );

    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getSumFinantialEvent(req, res) {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.sendStatus(401);
    }

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.sendStatus(401);
    }

    const events = await financialEventsRepository.selectFinancialEventsById(
      user.id
    );

    const sum = events.rows.reduce(
      (total, event) =>
        event.type === "INCOME" ? total + event.value : total - event.value,
      0
    );

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
