import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { isBrowser } from '@/utils/env';
import { RxStorage } from 'rxdb';

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
