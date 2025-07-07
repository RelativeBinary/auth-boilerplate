import { Auth } from "@supabase/auth-ui-react"
import supabase from "../supabaseClient"
import { ThemeSupa } from "@supabase/auth-ui-shared"

export const LoginPage = () => {
  return (
    <div>
      <h1>Welcome! Please sign in</h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  )
}