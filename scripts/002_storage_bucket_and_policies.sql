-- Create public 'media' bucket if not exists
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'media') then
    perform storage.create_bucket('media', public => true);
  end if;
end$$;

-- Allow public read on objects in 'media'
drop policy if exists "Public read media" on storage.objects;
create policy "Public read media" on storage.objects
for select using (bucket_id = 'media');

-- Allow authenticated users to upload to 'media'
drop policy if exists "Authenticated upload media" on storage.objects;
create policy "Authenticated upload media" on storage.objects
for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- Allow delete if the object corresponds to a media row owned by user
drop policy if exists "Owner delete media" on storage.objects;
create policy "Owner delete media" on storage.objects
for delete using (
  bucket_id = 'media'
  and auth.role() = 'authenticated'
  and exists (
    select 1 from public.media m
    where m.file_path = storage.objects.name
      and m.user_id = auth.uid()
  )
);
