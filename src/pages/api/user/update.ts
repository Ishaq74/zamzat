// src/pages/api/user/update.ts
import { supabase } from "@lib/supabase";
import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Non autorisé." }), { status: 401 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(accessToken);
  if (userError || !user) {
    return new Response(JSON.stringify({ error: "Utilisateur non trouvé." }), { status: 401 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    // Gestion de l'upload d'image
    const formData = await request.formData();
    const file = formData.get("avatar") as File;
    if (!file) {
      return new Response(JSON.stringify({ error: "Aucun fichier reçu." }), { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/heic"];
    if (!allowedTypes.includes(file.type)) {
      return new Response(JSON.stringify({ error: "Format d'image non autorisé." }), { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "Fichier trop volumineux (max 2MB)." }), { status: 400 });
    }

    const uploadsDir = path.resolve("public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const fileExtension = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: imageUrl }
    });

    if (updateError) {
      return new Response(JSON.stringify({ error: "Échec de la mise à jour de l'avatar." }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, url: imageUrl }), { status: 200 });
  }

  // Gestion de la mise à jour des infos utilisateur
  const { username, bio } = await request.json();
  const { error: updateError } = await supabase.auth.updateUser({
    data: { full_name: username, bio }
  });

  if (updateError) {
    return new Response(JSON.stringify({ error: "Erreur lors de la mise à jour." }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
