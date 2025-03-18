interface ImportMetaEnv {
  readonly MODE: string;
  readonly JWT_SECRET: string;
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: number;
  readonly SMTP_USER: string;
  readonly SMTP_PASSWORD: string;
  readonly SITE_URL: string;
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}