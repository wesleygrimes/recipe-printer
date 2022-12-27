import type { Direction } from '~/api/fetchRecipe';

export function Directions({ directions }: { directions: Direction[] }) {
  return (
    <p>
      <strong>Directions</strong>
      <ol>
        {directions.map((direction) => (
          <li key={direction.step}>{direction.description}</li>
        ))}
      </ol>
    </p>
  );
}
