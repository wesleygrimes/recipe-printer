import type { Recipe } from '~/api/fetchRecipe';
import { Directions } from './recipe/directions';
import { Ingredients } from './recipe/ingredients';

export function RecipeDetails({
  recipe,
  onPrint,
}: {
  recipe: Recipe;
  onPrint: () => void;
}) {
  return (
    <p>
      <h2
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>{recipe.title}</strong>
        <button type="button" onClick={onPrint}>
          Print
        </button>
      </h2>
      <Ingredients ingredients={recipe.ingredients} />
      <Directions directions={recipe.directions} />
    </p>
  );
}
