import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull().unique(),
  email_address: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  token: text("token").unique(),
  created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: false }).defaultNow(),
});

export const recipients = pgTable("recipients", {
  id: serial("id").primaryKey().notNull().unique(),
  name: text("name"),
  status: text("status").notNull(),
  user_id: text("user_id").notNull(),
  email_address: text("email_address").notNull(),
  sent_at: date("sent_at", { mode: "date" }).notNull(),
  note: text("note"),
});

export const usersRelation = relations(users, ({ many }) => ({
  recipients: many(recipients),
}));

export const recipientsRelation = relations(recipients, ({ one }) => ({
  user: one(users, {
    fields: [recipients.user_id],
    references: [users.id],
  }),
}));
