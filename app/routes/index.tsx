import { json } from '@remix-run/node';

import type { ActionArgs } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import type { Recipe } from '~/api/fetchRecipe';
import { fetchRecipe } from '~/api/fetchRecipe';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const urlFromForm = formData.get('url');

  if (typeof urlFromForm !== 'string' || !urlFromForm) {
    throw json({}, { status: 400 });
  }

  const url = new URL(urlFromForm);
  const recipe = await fetchRecipe(url);
  return json(recipe);
}

const Header = () => {
  return (
    <header className="no-print">
      <h1>Recipe Printer</h1>
      <Form method="post">
        <p style={{ display: 'flex', gap: '.7rem' }}>
          <input
            name="url"
            type="text"
            style={{ width: '100%', margin: 0 }}
            placeholder="Recipe url"
            defaultValue="https://www.allrecipes.com/recipe/79481/olive-puffs/"
          ></input>
          <input type="submit" style={{ margin: 0 }}></input>
        </p>
      </Form>
    </header>
  );
};

const RecipeDetails = ({
  recipe,
  onPrint,
}: {
  recipe: Recipe;
  onPrint: () => void;
}) => {
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
      <p>
        <strong>Ingredients</strong>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </p>
      <p>
        <strong>Directions</strong>
        <ol>
          {recipe.directions.map((direction) => (
            <li key={direction.step}>{direction.description}</li>
          ))}
        </ol>
      </p>
    </p>
  );
};

export default function Index() {
  const recipe = useActionData<typeof action>();

  const { state } = useTransition();

  const onPrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <main>
        {state === 'submitting' && <p>Fetching...</p>}
        {state === 'loading' && <p>Loading...</p>}
        {state === 'idle' && !recipe && <p>No results</p>}
        {state === 'idle' && recipe && (
          <RecipeDetails recipe={recipe} onPrint={onPrint} />
        )}
      </main>
    </>
  );
}
