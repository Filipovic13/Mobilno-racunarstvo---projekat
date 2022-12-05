export class Recipe {
  constructor(
    public id: string,
    public recipeName: string,
    public numOfIngredients: number,
    public numOfServings: number,
    public numOfCal: number,
    public details: string,
    public imageUrl: string,
    public userId: string
  ) {}
}
