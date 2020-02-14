import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {
      id
    } as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [
      {
        id: '1',
        title: JSON.stringify(recipesArgs),
      },
      {
        id: '2',
        title: '111'
      },
      {
        id: '3',
        title: '111'
      },
    ] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
