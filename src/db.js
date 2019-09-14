import Dexie from "dexie";

const db = new Dexie("SuperToDoDB");
db.version(1).stores({ todos: "id,todo,status,created_at" });

export default db;
