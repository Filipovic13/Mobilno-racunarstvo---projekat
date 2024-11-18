export class Recipe {
  constructor(
    public id: number,
    public userId: number,
    public recipeName: string,
    public numOfIngredients: number,
    public numOfServings: number,
    public numOfCal: number,
    public details: string,
    public imageUrl: string
  ) {}
}
