import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Text } from "native-base";
import { THEME } from './src/styles/theme'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/Signin';
export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
      <VStack flex={1} bgColor="gray.900">
        {
          fontsLoaded ? <SignIn /> : <Loading />
        }
      </VStack>
    </NativeBaseProvider>
  );
}

//? Native Base as Components Library
