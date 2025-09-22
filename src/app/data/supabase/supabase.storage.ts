import { Preferences } from '@capacitor/preferences';

export const capStorage = {
  getItem: async (key: string) => (await Preferences.get({ key })).value ?? null,
  setItem: (key: string, value: string) => Preferences.set({ key, value }),
  removeItem: (key: string) => Preferences.remove({ key }),
};
