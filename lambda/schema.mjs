import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(),
  registrationId: text('registration_id').notNull(),
  studentName: text('student_name').notNull(),
  studentNameBn: text('student_name_bn'),
  klass: text('klass').notNull(),
  school: text('school').notNull(),
  guardianName: text('guardian_name'),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});
