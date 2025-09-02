// Minimal Indexe```tsx file="lib/idb.ts"
// Minimal IndexedDB helpers (no external deps)

export type IDBStoreConfig = {
  name: string
  keyPath?: string
  autoIncrement?: boolean
}

const DB_NAME = "mediaDB"
const DB_VERSION = 1

let dbPromise: Promise<IDBDatabase> | null = null

export function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" })
        }
        if (!db.objectStoreNames.contains("media")) {
          const store = db.createObjectStore("media", {
            keyPath: "id",
            autoIncrement: true,
          })
          store.createIndex("type", "type", { unique: false })
          store.createIndex("createdAt", "createdAt", { unique: false })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

export async function idbGet<T>(storeName: string, key: IDBValidKey) {
  const db = await openDB()
  return new Promise<T | undefined>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly")
    const store = tx.objectStore(storeName)
    const req = store.get(key)
    req.onsuccess = () => resolve(req.result as T | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function idbPut<T>(storeName: string, value: T) {
  const db = await openDB()
  return new Promise<IDBValidKey>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    const req = store.put(value as any)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function idbAdd<T>(storeName: string, value: T) {
  const db = await openDB()
  return new Promise<IDBValidKey>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    const req = store.add(value as any)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function idbDelete(storeName: string, key: IDBValidKey) {
  const db = await openDB()
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite")
    const store = tx.objectStore(storeName)
    const req = store.delete(key)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}

export async function idbGetAll<T>(storeName: string) {
  const db = await openDB()
  return new Promise<T[]>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly")
    const store = tx.objectStore(storeName)
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as T[])
    req.onerror = () => reject(req.error)
  })
}
