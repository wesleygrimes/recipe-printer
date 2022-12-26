import jsdom from 'jsdom';

export interface Direction {
  step: number;
  description: string;
}

export interface Recipe {
  title: string;
  ingredients: string[];
  directions: Direction[];
}

function parseTitle(document: Document): string {
  const main = document.querySelector('main');
  if (!main) {
    throw new Error('Unable to fetch recipe');
  }

  const article = document.querySelector('article');
  if (!article) {
    throw new Error('Unable to fetch recipe');
  }

  const h1 = article.querySelector('h1');

  if (!h1) {
    throw new Error('Unable to fetch recipe');
  }

  if (!h1.textContent) {
    throw new Error('Unable to fetch recipe');
  }

  return h1.textContent.trim();
}

function parseIngredients(document: Document, parentNode: string): string[] {
  const wrapper = document.querySelector(parentNode);

  if (!wrapper) {
    throw new Error('Unable to fetch recipe');
  }

  const list = wrapper.querySelectorAll('li');

  if (!list) {
    throw new Error('Unable to fetch recipe');
  }

  let ingredients = new Array<string>();

  for (let index = 0; index < list.length; index++) {
    const item = list?.item(index);

    if (item && item.textContent) {
      ingredients.push(item.textContent);
    }
  }

  return ingredients;
}

function parseDirections(document: Document, parentNode: string): Direction[] {
  const wrapper = document.querySelector(parentNode);

  if (!wrapper) {
    throw new Error('Unable to fetch recipe');
  }

  const list = wrapper.querySelectorAll('li');

  if (!list) {
    throw new Error('Unable to fetch recipe');
  }

  let directions = new Array<Direction>();

  for (let index = 0; index < list.length; index++) {
    const item = list?.item(index);

    if (item && item.textContent) {
      directions.push({ step: 1, description: item.textContent });
    }
  }

  return directions;
}

export async function fetchRecipe(url: URL | string): Promise<Recipe> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to fetch recipe');
  }

  const text = await response.text();

  const { document } = new jsdom.JSDOM(text).window;

  const title = parseTitle(document);

  const ingredients = parseIngredients(
    document,
    '#mntl-structured-ingredients_1-0'
  );

  const directions = parseDirections(document, '#recipe__steps_1-0');

  return {
    title,
    ingredients,
    directions,
  };
}
