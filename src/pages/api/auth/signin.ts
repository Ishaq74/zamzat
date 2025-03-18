import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const provider = formData.get("provider")?.toString();

    const validProviders = ["google", "github", "discord"];

    // Connexion avec OAuth
    if (provider && validProviders.includes(provider)) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: import.meta.env.PUBLIC_SUPABASE_REDIRECT_URL || "http://localhost:4321/api/auth/callback",
        },
      });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }

      return new Response(JSON.stringify({ redirect: data.url }), { status: 200 });
    }

    // Connexion avec email et mot de passe
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email et mot de passe requis." }), { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Erreur de connexion Supabase:", error);

      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    const { session } = data;

    if (!session) {
      return new Response(JSON.stringify({ error: "Échec de l'authentification. Veuillez réessayer." }), { status: 500 });
    }

    // Sécurisation des cookies
    cookies.set("sb-access-token", session.access_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    cookies.set("sb-refresh-token", session.refresh_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return new Response(JSON.stringify({ success: "Connexion réussie !" }), { status: 200 });

  } catch (err) {
    console.error("Erreur inattendue lors de la connexion:", err);
    return new Response(JSON.stringify({ error: "Une erreur inattendue s'est produite." }), { status: 500 });
  }
};
