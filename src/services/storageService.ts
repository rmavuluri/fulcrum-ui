export class StorageService {
  private static USERS_KEY = 'users';
  private static ONBOARDING_KEY = 'onboarding';

  static initialize() {
    // Initialize users if not exists
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify({ users: [] }));
    }
    // Initialize onboarding if not exists
    if (!localStorage.getItem(this.ONBOARDING_KEY)) {
      localStorage.setItem(this.ONBOARDING_KEY, JSON.stringify({ entries: [] }));
    }
  }

  private static getItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private static setItem<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getUsers(): { users: any[] } {
    const data = this.getItem<{ users: any[] }>(this.USERS_KEY);
    return data || { users: [] };
  }

  static setUsers(data: { users: any[] }): void {
    this.setItem(this.USERS_KEY, data);
  }

  static getOnboarding(): { entries: any[] } {
    const data = this.getItem<{ entries: any[] }>(this.ONBOARDING_KEY);
    return data || { entries: [] };
  }

  static setOnboarding(data: { entries: any[] }): void {
    this.setItem(this.ONBOARDING_KEY, data);
  }
}