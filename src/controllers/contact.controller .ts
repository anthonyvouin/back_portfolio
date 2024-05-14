import { Request, Response } from 'express';
import {  ContactDocument, Contact }  from '../models/contact.model';
import { ContactProps }  from '../interface/contact/contact';


export const createContact = async (req: Request<any, any, ContactProps, any>, res: Response<any>) => {
  try {
    const contactData: ContactProps = req.body;

    const newContact: ContactDocument = new Contact({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      objet: contactData.objet,
      message: contactData.message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Message envoyé avec succès !' });
  } catch (error:any) {
    console.error('Erreur lors de l\'envoi du message:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
