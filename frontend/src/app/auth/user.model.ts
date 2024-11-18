export class User {
  constructor(
    public userId: number,
    public username: string,
    public email: string
  ) {}
}
// /* eslint-disable no-underscore-dangle */
// export class User {
//   constructor(
//     public id: string,
//     public email: string,
//     private _token: string,
//     private tokenExpirationDate: Date
//   ) {}

//   get token() {
//     if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
//       return null;
//     }
//     return this._token;
//   }
// }
