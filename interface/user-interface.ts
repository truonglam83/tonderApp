export interface IUser {
  distance?: number;
  age: number | null;
  alcohol: string;
  avatar: string | null;
  bio: string;
  children: boolean;
  education?: string;
  gender: string;
  hobbies: [];
  id: string;
  marriage: boolean;
  name: string;
  phone: string;
  reason: string;
  religion: boolean;
}

export interface IUserImage {
  avatar: {
    file: {
      thumbUrl: string;
      size: number;
    };
  };
  name: string;
  birthday: {
    $d: Date;
  };
}
