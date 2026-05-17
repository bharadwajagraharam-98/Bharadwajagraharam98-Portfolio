/*
  # Create contact_messages table

  Stores every contact form submission so messages are never lost
  even if email delivery fails.

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
      - `emailed` (boolean) — true once the notification email was sent

  2. Security
    - RLS enabled
    - INSERT allowed for anonymous users (public contact form)
    - SELECT/UPDATE restricted to service role only (no public read)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  emailed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a message (public contact form)
CREATE POLICY "Public can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
