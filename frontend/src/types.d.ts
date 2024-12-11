export interface IInputEntry {
  author: string;
  message: string;
  image: File | null;
}

export interface IEntry {
  id: string;
  author: string;
  message: string;
  image:string;
}

export interface IMessageWithDate {
  id: string | undefined;
  author: string;
  datetime: string;
  message: string;
}
