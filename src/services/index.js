const MongoLib = require('../lib/mongo');

class EventsService {
  constructor() {
    this.collection = 'event';
    this.mongoDB = new MongoLib();
  }

  async getEvents() {
    const events = await this.mongoDB.getAll(this.collection);
    return events || [];
  }

  async getEvent(id) {
    const event = await this.mongoDB.get(this.collection, id);
    return event || {};
  }

  async createEvent(data) {
    const createdEventId = await this.mongoDB.create(this.collection, data);
    return createdEventId;
  }

  async massCreateEvent(ArrayData) {
    ArrayData.forEach(async data => {
      const createdEventId = await this.mongoDB.create(this.collection, data);
      return createdEventId;
    });
  }

  async updateEvent(id, data) {
    const updatedEventId = await this.mongoDB.update(this.collection, id, data);
    return updatedEventId;
  }

  async deleteEvent(id) {
    const deletedEventId = await this.mongoDB.delete(this.collection, id);
    return deletedEventId;
  }
}

module.exports = EventsService;
