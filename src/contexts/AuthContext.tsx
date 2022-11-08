import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

interface UserProps {
  name: string
  avatarURL: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

WebBrowser.maybeCompleteAuthSession()

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading ] = useState(false)

  const [ request, response, promptAsync ] = Google.useAuthRequest({
    clientId: '762663668220-3o1r2ddh6pa125q3eqihbsdvbivum9j0.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true}),
    scopes: ['profile', 'email']
  })

  //? the useAuthRequest returns the request, response
  //? And a async function that starts the login proccess

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync();
      
    } catch (error) {
      console.log(error)
      throw error;
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('Access Token: ok =>', access_token)

  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])
  
  return (
     <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user,
     }}>
      {children}

     </AuthContext.Provider>
  )
}