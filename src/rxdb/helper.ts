import type { RxStorage } from 'rxdb';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { isBrowser } from '@/utils/env';

export function getBrowserStorage() {
  return getRxStorageDexie({
    addons: [],
  });
}

export function getServerStorage() {
  return getRxStorageMemory();
}

export function wrappedStorage(storage: RxStorage<any, any>) {
  const compressionStorage = wrappedKeyCompressionStorage({ storage });
  const validateStorage = wrappedValidateAjvStorage({
    storage: compressionStorage,
  });
  return validateStorage;
}

export function getStorage() {
  return wrappedStorage(isBrowser ? getBrowserStorage() : getServerStorage());
}
