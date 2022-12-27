export function Ingredients({ ingredients }: { ingredients: string[] }) {
  return (
    <p>
      <strong>Ingredients</strong>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </p>
  );
}
