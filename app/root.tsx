import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from '@remix-run/react';

import styles from './styles.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Recipe Printer',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: 'https://cdn.simplecss.org/simple.min.css' },
    { rel: 'icon', href: 'favicon.ico' },
    { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
    { rel: 'icon', href: 'favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', href: 'favicon-16x16.png', sizes: '16x16' },
    {
      rel: 'shortcut icon',
      href: 'android-chrome-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'shortcut icon',
      href: 'android-chrome-512x512.png',
      sizes: '512x512',
    },
  ];
};

export default function App() {
  const matches = useMatches();

  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}
