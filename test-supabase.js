import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://aooeivkygajraashbnbn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_DAhEM9mndex_oXuqI42j5Q_SuNnA0CW";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function test() {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{
      name: 'Test Name',
      phone: '1234567890',
      message: 'Test message',
      city: 'Test City',
      budget: 'Test Budget'
    }])
    .select();
    
  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Supabase Insert Success:", data);
  }
}

test();
