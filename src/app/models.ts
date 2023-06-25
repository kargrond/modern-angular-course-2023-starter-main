export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface DisneyCharacter {
  data: DisneyCharacterData[];
}

export interface DisneyCharacterData {
  id: number;
  name: string;
  imageUrl: string;
}
