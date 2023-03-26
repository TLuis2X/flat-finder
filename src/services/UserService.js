import { User } from "@/models/User";

export default class UserService {
  constructor() { }

  async register(supabase, name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      //options specifies "user_metadata" property
      options: {
        data: {
          name,
        },
      },
    });
    const response = await supabase
      .from("profile")
      .insert({
        email,
        name,
        user_id: data.user.id,
        last_sign_in_at: data.user.last_sign_in_at,
      })
      .select()
      .eq("user_id", data.user.id);
    console.log(response.data[0]);
    return new User(response.data[0]);
    // return response.data[0];
  }

  async login(supabase, email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const response = await supabase
      .from("profile")
      .update({ last_sign_in_at: data.user.last_sign_in_at })
      .select("*")
      .eq("user_id", String(data.user.id));
    return new User(response.data[0]);
  }

  async getAuthUserProfile(supabase) {
    const { data } = await supabase.auth.getUser();
    const user_profile = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", String(data.user.id));

    // console.log(user_profile);
    return new User(user_profile.data[0]);
  }

  async logout(supabase) {
    const { error } = await supabase.auth.signOut();
  }

  async updateAvatar(supabase, url, profile_id) {
    const response = await supabase
    .from("profile")
    .update({ avatar_url: url})
    .eq("id", String(profile_id)); 

    console.log('Response: ', response)
  }

}
