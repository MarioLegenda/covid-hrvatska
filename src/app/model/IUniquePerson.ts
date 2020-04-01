export interface IUniquePerson {
  createId(): string;
  equals(person: IUniquePerson);
}
