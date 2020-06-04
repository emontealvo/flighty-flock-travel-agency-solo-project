 class User {
   constructor(type , trips) {
     this.type = type || 'Guest';
     this.trips = trips || [];
   };
 };

 export default User;