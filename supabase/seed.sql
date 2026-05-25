insert into public.resource_categories (name, slug, description)
values
  ('כלים להורות', 'parenting-tools', 'דפי עבודה ומדריכים מעשיים להורות יומיומית.'),
  ('מעברים בבית הספר', 'school-transitions', 'משאבים לשינויים בבית הספר, שגרות והסתגלות.'),
  ('תקשורת', 'communication', 'כלים לתקשורת משפחתית חמה יותר.'),
  ('תמיכה רגשית', 'emotional-support', 'משאבים לוויסות רגשי וחוסן.'),
  ('משאבי קהילה', 'community-resources', 'המלצות לתמיכה מקומית ומקוונת.')
on conflict (slug) do nothing;

insert into public.resources (title, slug, description, type, category_id, visibility, file_path, external_url, video_url)
select 'מדריך היכרות PDF לדוגמה', 'welcome-guide-pdf-placeholder', 'מדריך היכרות לחברים לצורכי פיתוח.', 'pdf', id, 'members', 'welcome-guide.pdf', null, null
from public.resource_categories where slug = 'parenting-tools'
on conflict (slug) do nothing;

insert into public.resources (title, slug, description, type, category_id, visibility, file_path, external_url, video_url)
select 'סרטון היכרות לדוגמה', 'introductory-video-placeholder', 'משאב וידאו מאובטח לדוגמה. לתוכן רגיש השתמשו ב-Vimeo, Mux או באחסון מוגן.', 'video', id, 'members', null, null, 'https://example.com/protected-video'
from public.resource_categories where slug = 'communication'
on conflict (slug) do nothing;

insert into public.resources (title, slug, description, type, category_id, visibility, file_path, external_url, video_url)
select 'דף עבודה לדוגמה', 'worksheet-placeholder', 'דף עבודה לדוגמה לתרגול שיחות בין הורים לילדים.', 'worksheet', id, 'members', 'conversation-worksheet.pdf', null, null
from public.resource_categories where slug = 'communication'
on conflict (slug) do nothing;

insert into public.resources (title, slug, description, type, category_id, visibility, file_path, external_url, video_url)
select 'מאמר ציבורי לדוגמה', 'public-article-placeholder', 'מאמר ציבורי לדוגמה שניתן לקרוא ללא כניסה לחשבון.', 'article', id, 'public', null, 'https://example.com/public-article', null
from public.resource_categories where slug = 'emotional-support'
on conflict (slug) do nothing;

insert into public.announcements (title, body, visibility)
values
  ('ברוכים הבאים לאזור החברים', 'המרחב הפרטי הזה מיועד להורים מאושרים שרוצים לגשת למשאבים ולהתחבר בצורה מכבדת.', 'members'),
  ('תזכורת פרטיות לקהילה', 'אנא השתמשו בשמות תצוגה ובבקשות קשר במקום לשתף פרטי קשר פרטיים בפוסטים.', 'members')
on conflict do nothing;
