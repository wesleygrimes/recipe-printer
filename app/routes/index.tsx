import { json } from '@remix-run/node';

import type { ActionArgs } from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { fetchRecipe } from '~/api/fetchRecipe';
import { Header } from '~/components/header';
import { RecipeDetails } from '~/components/recipe';

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
