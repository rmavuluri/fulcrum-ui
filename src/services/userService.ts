import { User, LoginCredentials, SignupCredentials } from '../types/auth';
import { StorageService } from './storageService';

export class UserService {
  static findByEmail(email: string): User | undefined {
    const { users } = StorageService.getUsers();
    return users.find((user: User) => user.email === email);
  }

  static createUser(credentials: SignupCredentials): User {
    const data = StorageService.getUsers();
    
    if (this.findByEmail(credentials.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      password: credentials.password, // In production, this should be hashed
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    StorageService.setUsers(data);
    return newUser;
  }

  static validateCredentials(credentials: LoginCredentials): User | null {
    const user = this.findByEmail(credentials.email);
    if (user && user.password === credentials.password) {
      return user;
    }
    return null;
  }
}