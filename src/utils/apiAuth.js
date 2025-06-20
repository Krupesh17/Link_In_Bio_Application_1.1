import supabase, { supabaseUrl } from "./supabase";
import { createUserProfile } from "./apiUserProfile";
import { createAppearance } from "./apiAppearance";

export async function createAccount({ username, name, email, password }) {
  try {
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (userError) throw userError;

    const userProfileData = await createUserProfile({
      user_id: userData?.user?.id,
      name: name,
      username: username,
      profile_title: name,
    });

    const userLinkChainPageAppearanceData = await createAppearance({
      user_id: userData?.user?.id,
      social_icons_position: "top",
      username: username,
    });

    return {
      user: userData?.user,
      profile: userProfileData,
      appearance: userLinkChainPageAppearanceData,
    };
  } catch (error) {
    throw error;
  }
}

export async function signIn({ email, password }) {
  try {
    if (!email || !password) {
      throw new Error("Please fill in all required fields to continue.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data?.user;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) error;
  } catch (error) {
    throw error;
  }
}

export async function getStartedWithGoogle({ username, type }) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          type === "sign-up"
            ? `${window.location.origin}/account-setup?username=${username}`
            : `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword({ email, changePasswordToken }) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/change-password?reset_token=${changePasswordToken}`,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(new_password) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
}
