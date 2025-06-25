import { signal } from '@preact/signals';
import type { MyDatabase } from '@/rxdb';

export let docsDb: MyDatabase;

export function setDocsDb(db: MyDatabase) {
  if (docsDb) return;
  docsDb = db;
}

export const count = signal(0);
