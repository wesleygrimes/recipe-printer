import { Form } from '@remix-run/react';

export function Header() {
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
          ></input>
          <input type="submit" style={{ margin: 0 }}></input>
        </p>
      </Form>
    </header>
  );
}
