const express = require('express');
const path = require('path');
const EventService = require('../services');
const receipt = '../assets/receipt.pdf'

const connectMeetups = (app) => {
  const router = express.Router();
  const eventRouter = 'events';
  app.use('/api/', router);

  const eventService = new EventService();

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get(`/${eventRouter}`, async (req, res, next) => {
    const storeEvents = await eventService.getEvents()
    res.status(200).json(storeEvents);
  });

  router.get(`/${eventRouter}/:id`, async (req, res, next) => {
    const { id } = req.params;

    try {
      const event = await eventService.getEvent(id);

      res.status(200).json({
        data: event,
        message: 'event retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(`/${eventRouter}/create/`, async (req, res, next) => {
    const { body: event } = req;

    try {
      const createdEventId = await eventService.createEvent({ event });
      res.status(201).json({
        data: createdEventId,
        message: 'event created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(`/${eventRouter}/mass-create/`, async (req, res, next) => {
    const { body: event } = req;
    try {
      const createdEventId = await eventService.massCreateEvent(event);

      res.status(201).json({
        data: createdEventId,
        message: 'events created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(`/${eventRouter}/:id/`, async (req, res, next) => {
    const { id } = req.params;
    const { body: event } = req;

    try {
      const updatedEventId = await eventService.updateEvent(id, event);

      res.status(200).json({
        data: updatedEventId,
        message: 'Event updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(`/${eventRouter}/:id`, async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedEventId = await eventService.deleteEvent({ id });

      res.status(200).json({
        data: deletedEventId,
        message: 'event deleted'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = connectMeetups;