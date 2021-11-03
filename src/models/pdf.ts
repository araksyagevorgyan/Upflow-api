import { Thumbnail } from "./thumbnail";

export type Pdf = {
   id: string;
   url: string;
   name: string;
   thumbnails?: Thumbnail[];
}