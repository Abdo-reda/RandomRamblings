create table
  public."Users" (
    id uuid not null default gen_random_uuid (),
    name character varying null,
    email character varying not null,
    created_at timestamp with time zone not null default now(),
    constraint Users_pkey primary key (id),
    constraint Users_email_key unique (email)
  ) tablespace pg_default;