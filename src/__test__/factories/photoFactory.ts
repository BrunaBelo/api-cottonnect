import { Photo } from "../../model/photo";
import { Factory } from "./typeorm-factory/Factory";

export const photo01 = new Factory(Photo)
    .attr("id", "729b3cc8-1088-4f88-a08b-5a40ec913ce4",)
    .attr("name", "photo01",)
    .attr("type", ".png",)
    .attr("uri", "/upload/photo01.png",)
    .attr("donation_object_id", "b27554ec-2df6-4d0b-a3ac-aa2ec9d900fe")
