import type UserRepositoryInterface from '@/domain/user.repository.interface';
import type NotesApiTransport from './transport/notes-api';
import type { UserStore, UserStoreData } from './storage/user';
import type { User } from '@/domain/entities/User';
import Repository from './repository';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Facade for the user data
 */
export default class UserRepository extends Repository<UserStore, UserStoreData> implements UserRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: NotesApiTransport;

  /**
   * Repository constructor
   *
   * @param store - stores user data
   * @param notesApiTransport - notes api transport instance
   */
  constructor(store: UserStore, notesApiTransport: NotesApiTransport) {
    super(store);

    this.transport = notesApiTransport;
  }

  /**
   * Returns data of the current user
   */
  public async loadUser(): Promise<void> {
    const response = await this.transport.get<User>('/user/myself');

    this.store.setUser(response);
  }

  /**
   * Load user data and put it to the storage
   */
  public getUser(): User | null {
    return this.store.getUser();
  }

  /**
   * Removes user data from the storage
   */
  public async removeUser(): Promise<void> {
    this.store.removeUser();
  }

  /**
   * Load tools and set it
   */
  public async loadUserEditorTools(): Promise<void> {
    const response = await this.transport.get<{ data: EditorTool[] }>('/user/editor-tools');

    this.store.setUserEditorTools(response.data);
  }

  /**
   * Returns current user editor tools
   */
  public getUserEditorTools(): EditorTool[] {
    return this.store.getUserEditorTools();
  }

  /**
   * Adds a tool to the user
   *
   * @param id - tool id
   */
  public async addTool(id: string): Promise<void> {
    const res = await this.transport.post<{ addedTool: EditorTool }>('/user/editor-tools', {
      toolId: id,
    });

    this.store.addEditorTool(res.addedTool);
  }

  /**
   * Removes a tool from the user
   *
   * @param id - tool id
   */
  public async removeTool(id: string): Promise<void> {
    const res = await this.transport.delete<{ removedId: EditorTool['id'] }>('/user/editor-tools', {
      toolId: id,
    });

    this.store.removeEditorTool(res.removedId);
  }
}
