import { expect } from 'chai';

import databaseDriver from '../../server/drivers/databaseDriver';

beforeEach(async () => {
  const db = databaseDriver.db();
  await db.none(`
DO
$func$
BEGIN
   -- RAISE NOTICE '%', 
   EXECUTE
   (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
    FROM   pg_class
    WHERE  relkind = 'r'  -- only tables
    AND    relnamespace = 'public'::regnamespace
    AND    relname != 'pgmigrations'
   );
END
$func$;

    `.trim());
});

describe('Some sanity', () => {
  it('passes', () => {
    expect(1).to.equal(1);
  })
});
