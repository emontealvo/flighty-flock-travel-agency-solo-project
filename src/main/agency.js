import User from './user'

class Agency extends User {
  constructor(trips, destinationKey) {
    super('Agency', trips, destinationKey);
  };
};

export default Agency; 
