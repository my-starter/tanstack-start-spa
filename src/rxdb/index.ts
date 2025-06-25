import { createRxDatabase, addRxPlugin, RxDatabase } from 'rxdb';
import { isBrowser, isDev } from '@/utils/env';
import { HeroCollection, heroSchema } from './schemes/hero';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { getStorage } from './helper';

export type MyDatabaseCollections = {
  heroes: HeroCollection;
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;

export const getDbName = (name: string) =>
  isBrowser ? name : `${name}-${Math.random().toString(36).substring(2, 15)}`;

export async function createDb(name: string) {
  if (isDev) {
    await import('rxdb/plugins/dev-mode').then((module) =>
      addRxPlugin(module.RxDBDevModePlugin)
    );
  }

  const db = await createRxDatabase<MyDatabaseCollections>({
    name: getDbName(name),
    storage: getStorage(),
  });

  addRxPlugin(RxDBJsonDumpPlugin);
  db.addCollections({
    heroes: {
      schema: heroSchema,
      methods: {
        scream: (v: string) => v.toUpperCase(),
      },
      statics: {
        countAllDocuments: () => Promise.resolve(0),
      },
    },
  });
  return db as MyDatabase;
}
