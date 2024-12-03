/** Mapa de dados */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Serve para armazenar dados no dispositivo
 */
class Memoria {
  constructor(protected memoria = AsyncStorage) {}

  /**
   * @param key Chave do valor a ser armazenado
   * @param value Valor a ser armazenado
   * @param TTL Tempo de vida em segundos
   */
  public async set<T>(key: string, value: T, TTL = 36000): Promise<void> {
    await this.delete(key);
    await this.memoria.setItem(
      key,
      JSON.stringify({ value, TTL: Date.now() + TTL * 1000 })
    );
  }

  public async get<T>(key: string): Promise<T | void> {
    const item = await this.memoria.getItem(key);

    if (!item) return;

    const { value, TTL } = JSON.parse(item) as { value: T; TTL?: number };

    if (!TTL) return;

    if (TTL < Date.now()) return await this.delete(key);

    return value;
  }

  public async delete(key: string): Promise<void> {
    await this.memoria.removeItem(key);
  }

  public async deleteAll(): Promise<void> {
    await this.memoria.clear();
  }
}

export default new Memoria();
