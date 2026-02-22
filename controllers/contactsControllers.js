import HttpError from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;

  const contacts = await contactsService.listContacts({ owner });

  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;

  const contact = await contactsService.getContact({ id, owner });

  if (!contact) {
    throw new HttpError(404);
  }
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsService.removeContact({ id, owner });

  if (!contact) {
    throw new HttpError(404);
  }
  res.json(contact);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const data = req.body;

  const contact = await contactsService.addContact({ ...data, owner });

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id: owner } = req.user;
  const { id } = req.params;
  const data = req.body;

  const contact = await contactsService.updateContact({ id, owner }, data);

  if (!contact) {
    throw new HttpError(404);
  }

  res.status(200).json(contact);
};
