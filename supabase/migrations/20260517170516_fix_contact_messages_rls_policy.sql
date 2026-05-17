/*
  # Fix contact_messages RLS INSERT policy

  ## Problem
  The existing INSERT policy uses `WITH CHECK (true)`, granting unrestricted
  insert access to all roles. This is flagged as a security risk.

  ## Changes
  - Drop the overly permissive policy
  - Replace with a constrained INSERT policy that enforces:
    - All three fields (name, email, message) must be non-empty strings
    - Field lengths are capped (name ≤ 200, email ≤ 254, message ≤ 5000)
    - Basic email format check (must contain '@')
  - This keeps the form functional for anonymous visitors while preventing
    abuse (spam floods, oversized payloads, blank submissions).
*/

DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;

CREATE POLICY "Public can insert valid contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name))    BETWEEN 1 AND 200  AND
    length(trim(email))   BETWEEN 1 AND 254  AND
    trim(email) LIKE '%@%'                   AND
    length(trim(message)) BETWEEN 1 AND 5000
  );
