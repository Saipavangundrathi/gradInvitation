import { users, type User, type InsertUser, rsvps, type Rsvp, type InsertRsvp } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // RSVP methods
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getRsvps(): Promise<Rsvp[]>;
  getRsvpsByAttending(attending: string): Promise<Rsvp[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rsvpList: Map<number, Rsvp>;
  currentUserId: number;
  currentRsvpId: number;

  constructor() {
    this.users = new Map();
    this.rsvpList = new Map();
    this.currentUserId = 1;
    this.currentRsvpId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const id = this.currentRsvpId++;
    
    // Create a properly typed RSVP object
    const rsvp: Rsvp = {
      id,
      name: insertRsvp.name,
      email: insertRsvp.email,
      phone: insertRsvp.phone === undefined ? null : insertRsvp.phone,
      attending: insertRsvp.attending,
      guests: insertRsvp.guests,
      message: insertRsvp.message === undefined ? null : insertRsvp.message
    };
    
    this.rsvpList.set(id, rsvp);
    return rsvp;
  }

  async getRsvps(): Promise<Rsvp[]> {
    return Array.from(this.rsvpList.values());
  }

  async getRsvpsByAttending(attending: string): Promise<Rsvp[]> {
    return Array.from(this.rsvpList.values()).filter(
      (rsvp) => rsvp.attending === attending
    );
  }
}

export const storage = new MemStorage();
