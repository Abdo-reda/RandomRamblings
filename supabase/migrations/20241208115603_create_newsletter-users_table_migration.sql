create table
  public."NewsletterUsers" (
    id bigint generated by default as identity not null,
    user_id uuid not null default gen_random_uuid (),
    active boolean not null default true,
    tags jsonb null,
    theme character varying not null default 'dark'::character varying,
    notification character varying not null default 'weekly'::character varying,
    created_at timestamp with time zone not null default now(),
    constraint NewsletterUsers_pkey primary key (id),
    constraint NewsletterUsers_user_id_key unique (user_id),
    constraint NewsletterUsers_user_id_fkey foreign key (user_id) references "Users" (id) on update cascade on delete cascade
  ) tablespace pg_default;