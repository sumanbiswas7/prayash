import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  registrationId: text('registration_id').notNull(),
  studentName: text('student_name').notNull(),
  studentNameBn: text('student_name_bn'),
  klass: text('klass').notNull(),
  school: text('school').notNull(),
  dob: text('dob').notNull(),
  address: text('address').notNull(),
  guardianName: text('guardian_name'),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  passwordHash: text('password_hash').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const eventRegistrations = pgTable('event_registrations', {
  id: serial('id').primaryKey(),
  registrationId: text('registration_id').notNull(),
  studentRegistrationId: text('student_registration_id').notNull(),
  studentName: text('student_name').notNull(),
  eventId: text('event_id').notNull(),
  eventName: text('event_name').notNull(),
  group: text('group').notNull(),
  partnerName: text('partner_name'),
  applicationFee: boolean('application_fee').default(false).notNull(),
  year: text('year').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
