 class User {
   constructor(type , trips, destinationKey) {
     this.type = type || 'Guest';
     this.trips = trips || [];
     this.destinationKey = destinationKey;
   };

   calculateTotalTripCost() {

   }
 };

 export default User;