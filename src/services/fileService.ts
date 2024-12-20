import fs from 'fs';
import path from 'path';

export class FileService {
  private static DATA_DIR = path.join(process.cwd(), 'src', 'data');

  private static ensureDataDir() {
    if (!fs.existsSync(this.DATA_DIR)) {
      fs.mkdirSync(this.DATA_DIR, { recursive: true });
    }
  }

  private static readJsonFile<T>(filename: string): T {
    try {
      this.ensureDataDir();
      const filePath = path.join(this.DATA_DIR, filename);
      
      if (!fs.existsSync(filePath)) {
        return { users: [] } as T;
      }
      
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return { users: [] } as T;
    }
  }

  private static writeJsonFile<T>(filename: string, data: T): void {
    try {
      this.ensureDataDir();
      const filePath = path.join(this.DATA_DIR, filename);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      throw error;
    }
  }

  static getUsers() {
    return this.readJsonFile<{ users: any[] }>('users.json');
  }

  static saveUsers(data: { users: any[] }) {
    return this.writeJsonFile('users.json', data);
  }

  static getOnboarding() {
    return this.readJsonFile<{ entries: any[] }>('onboarding.json');
  }

  static saveOnboarding(data: { entries: any[] }) {
    return this.writeJsonFile('onboarding.json', data);
  }
}