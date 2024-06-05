import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull().unique(),
  email_address: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  token: text("token").unique(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at").notNull(),
});

export const recipient = pgTable("recipients", {
  id: serial("id").primaryKey().notNull().unique(),
  name: text("name").notNull(),
  status: text("status").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  email_address: text("email_address").notNull(),
  sent_at: timestamp("sent_at").notNull(),
  note: text("note"),
});
