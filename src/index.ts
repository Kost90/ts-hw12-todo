interface INote {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  markAsCompleted(): void;
  update(value: INote): void;
}

class TodoList {
  private _notes: INote[] = [];

  get notes(): INote[] {
    return this._notes;
  }

  get total(): number {
    return this._notes.length;
  }

  get incompleted(): number {
    return this._notes.filter((x) => !x.isCompleted).length;
  }

  add(note: INote): void {
    this._notes.push(note);
  }

  remove(id: string): void {
    this._notes = this.notes.filter((x) => x.id !== id);
  }

  update(id: string, payload: INote): void {
    const note = this._notes.find((x) => x.id === id);
    if (!note) {
      throw new Error("Incorrect id");
    }
    note.update(payload);
  }

  getNoteByID(id: string): INote | undefined {
    const note = this._notes.find((x) => x.id === id);
    if (!note) {
      throw new Error("Incorrect id");
    }
    return note;
  }

  markAsComplited(id: string): void {
    const note = this._notes.find((x) => x.id === id);
    if (!note) {
      throw new Error("Incorrect id");
    }
    note.markAsCompleted();
  }
}

class Note implements INote {
  public readonly id: string;
  public isCompleted = false;

  constructor(
    public title: string,
    public text: string
  ) {}

  public markAsCompleted(): void {
    this.isCompleted = true;
  }

  public update(note: Note): void {
    Object.assign(this, note);
  }
}

class NoteConfirm implements INote {
  public readonly id: string;
  public isCompleted = false;

  constructor(
    public title: string,
    public text: string,
    public confirmationFn: () => boolean
  ) {}

  public markAsCompleted(): void {
    this.isCompleted = true;
  }

  public update(note: NoteConfirm): void {
    if (!this.confirmationFn()) return;
    Object.assign(this, note);
  }
}

const note = new NoteConfirm("First", "Second", confirm);

new TodoList().add(note);
