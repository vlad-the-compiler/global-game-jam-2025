import { Nullable } from "@/utils/types";

export type PlayerDetails = {
  token: string;
  name: string;
  gm: boolean;
  color: Nullable<number>;
  face: Nullable<number>;
  accessory: Nullable<number>;
};

export type Chat = {
  playerToken: string;
  thread: string[];
};
