    // server/config/supabaseClient.js

    const { createClient } = require('@supabase/supabase-js');

    // Pega a URL e a chave do nosso arquivo .env
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // Cria e exporta uma única instância do cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);

    module.exports = supabase;
    