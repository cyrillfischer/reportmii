/*
  # Reportmii Database Schema

  ## Overview
  Creates the complete database structure for the Reportmii platform including user profiles,
  analyses, blocks, questions, and results.

  ## New Tables
  
  ### `profiles`
  - `id` (uuid, references auth.users)
  - `role` (text) - 'standard' or 'whitelabel'
  - `language` (text) - 'de', 'en', 'fr', 'es'
  - `company` (text)
  - `logo_url` (text)
  - `brand_color` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `analyses`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `type` (text) - 'business' or 'inside'
  - `company_name` (text)
  - `industry` (text)
  - `country` (text)
  - `logo_url` (text)
  - `status` (text) - 'draft', 'in_progress', 'completed'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `blocks`
  - `id` (uuid, primary key)
  - `analysis_id` (uuid, references analyses)
  - `title` (text)
  - `description` (text)
  - `order_index` (integer)
  - `is_active` (boolean)
  - `is_custom` (boolean)
  - `created_at` (timestamptz)

  ### `questions`
  - `id` (uuid, primary key)
  - `block_id` (uuid, references blocks)
  - `text` (text)
  - `type` (text) - 'scale', 'text', 'multiple_choice'
  - `options` (jsonb) - for multiple choice
  - `is_main` (boolean) - show in report charts
  - `order_index` (integer)
  - `created_at` (timestamptz)

  ### `answers`
  - `id` (uuid, primary key)
  - `question_id` (uuid, references questions)
  - `analysis_id` (uuid, references analyses)
  - `value` (text)
  - `numeric_value` (integer) - for scale questions
  - `created_at` (timestamptz)

  ### `white_label_customers`
  - `id` (uuid, primary key)
  - `partner_id` (uuid, references profiles)
  - `customer_name` (text)
  - `customer_email` (text)
  - `subdomain` (text)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - White-label partners can access their customers' data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'standard',
  language text NOT NULL DEFAULT 'de',
  company text,
  logo_url text,
  brand_color text DEFAULT '#8b5cf6',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create analyses table
CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  company_name text NOT NULL,
  industry text,
  country text,
  logo_url text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses"
  ON analyses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
  ON analyses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses"
  ON analyses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
  ON analyses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create blocks table
CREATE TABLE IF NOT EXISTS blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  is_custom boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view blocks of own analyses"
  ON blocks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = blocks.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create blocks for own analyses"
  ON blocks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = blocks.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update blocks of own analyses"
  ON blocks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = blocks.analysis_id
      AND analyses.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = blocks.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete blocks of own analyses"
  ON blocks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = blocks.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id uuid NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
  text text NOT NULL,
  type text NOT NULL DEFAULT 'scale',
  options jsonb,
  is_main boolean DEFAULT false,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view questions of own analyses"
  ON questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blocks
      JOIN analyses ON analyses.id = blocks.analysis_id
      WHERE blocks.id = questions.block_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create questions for own analyses"
  ON questions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM blocks
      JOIN analyses ON analyses.id = blocks.analysis_id
      WHERE blocks.id = questions.block_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update questions of own analyses"
  ON questions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blocks
      JOIN analyses ON analyses.id = blocks.analysis_id
      WHERE blocks.id = questions.block_id
      AND analyses.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM blocks
      JOIN analyses ON analyses.id = blocks.analysis_id
      WHERE blocks.id = questions.block_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete questions of own analyses"
  ON questions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blocks
      JOIN analyses ON analyses.id = blocks.analysis_id
      WHERE blocks.id = questions.block_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  analysis_id uuid NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  value text NOT NULL,
  numeric_value integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view answers of own analyses"
  ON answers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = answers.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create answers for own analyses"
  ON answers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = answers.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update answers of own analyses"
  ON answers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = answers.analysis_id
      AND analyses.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM analyses
      WHERE analyses.id = answers.analysis_id
      AND analyses.user_id = auth.uid()
    )
  );

-- Create white_label_customers table
CREATE TABLE IF NOT EXISTS white_label_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  subdomain text UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE white_label_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Partners can view own customers"
  ON white_label_customers FOR SELECT
  TO authenticated
  USING (auth.uid() = partner_id);

CREATE POLICY "Partners can create customers"
  ON white_label_customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can update own customers"
  ON white_label_customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = partner_id)
  WITH CHECK (auth.uid() = partner_id);

CREATE POLICY "Partners can delete own customers"
  ON white_label_customers FOR DELETE
  TO authenticated
  USING (auth.uid() = partner_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_blocks_analysis_id ON blocks(analysis_id);
CREATE INDEX IF NOT EXISTS idx_questions_block_id ON questions(block_id);
CREATE INDEX IF NOT EXISTS idx_answers_analysis_id ON answers(analysis_id);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_white_label_customers_partner_id ON white_label_customers(partner_id);
