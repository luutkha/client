export interface GroupChat {
    members: string[];
    admins: string[];
    _id: string;
    name: string;
    avatar: string;
    createdAt?: string;
    updatedAt?: string;
    description: string
  }