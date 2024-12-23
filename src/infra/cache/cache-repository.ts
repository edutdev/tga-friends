export abstract class CacheRepository {
  abstract set(key: string, value: string): Promise<void>
  abstract setWithTTL(key: string, value: string, ttl: number): Promise<void>
  abstract get(key: string): Promise<string | null>
  abstract delete(key: string): Promise<void>
}
