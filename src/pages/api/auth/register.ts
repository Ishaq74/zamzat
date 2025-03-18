import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email et mot de passe requis." }), { status: 400 });
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      const errorMessages: Record<string, string> = {
        "weak_password": "Le mot de passe doit contenir au moins 6 caractères.",
        "user_already_exists": "Cet utilisateur est déjà inscrit.",
        "email_address_invalid": "L'adresse email est invalide.",
        "signup_disabled": "Les inscriptions sont désactivées.",
        "unexpected_failure": "Une erreur inconnue est survenue, veuillez réessayer."
      };

      return new Response(JSON.stringify({ error: errorMessages[error.code] || "Une erreur est survenue." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: "Compte créé ! Vérifiez votre email." }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Une erreur inattendue s'est produite." }), { status: 500 });
  }
};
