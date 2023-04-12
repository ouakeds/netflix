import TextInput from "@/components/Inputs/TextInput";
import { FormEvent, useCallback, useState } from "react";
import axios from 'axios';
import {signIn} from 'next-auth/react';
import { FcGoogle} from 'react-icons/fc'
import { FaGithub} from 'react-icons/fa'
import { IconType } from "react-icons";


const callbackUrl = '/profiles';

enum Variant {
  LOGIN = 'login',
  SUBSCRIBE = 'subscribe'
}

interface IRoundedIcon {
  Icon: IconType,
  onClick?: () => void;
}

const RoundedIcon: React.FC<IRoundedIcon> = ({Icon, onClick}) => {
  return <div onClick={onClick} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
    <Icon/>
  </div>
}

export default function Auth() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState(Variant.LOGIN);

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => setEmail(event.target.value)
  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => setPassword(event.target.value)
  const handleUsernameChange = (event: FormEvent<HTMLInputElement>) => setName(event.target.value)

  const handleVariantChange = useCallback(() => {
    setVariant((currentVariant) => currentVariant === Variant.LOGIN ? Variant.SUBSCRIBE : Variant.LOGIN)
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', { email, password, callbackUrl: callbackUrl})
    } catch (error) {
      console.log('error: ', error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email, name, password
      })
      login()
    } catch (error) {
      console.log('error: ', error)
    }
  }, [email, name, password, login])

  return (
    <div className="relative h-full w-full  bg-[url('/images/login-background.jpeg')] bg-cover bg-no-repeat bg-fix bg-center">
      <div className="h-full w-full bg-zinc-900 lg:bg-opacity-50">

        <nav className="px-10 py-4">
          <img src='/images/logo.png' alt='Logo' className="h-28"/>
        </nav>

        <div className="flex justify-center">
          <div className="w-full bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md">
            <h1 className="text-4xl text-white font-bold mb-6">{variant === Variant.LOGIN ? "Sign In" : "Sign Up" }</h1>
            {
              variant === Variant.SUBSCRIBE && <TextInput label="Username" id="name" type='name' value={name} onChange={handleUsernameChange}/>
            }
            
            <TextInput label="Email" id="email" type="email" value={email} onChange={handleEmailChange}/>
            <TextInput label="Password" id="password" type="password" value={password} onChange={handlePasswordChange}/>
            <button className="bg-red-600 text-white text-xl w-full rounded-md py-3 mt-6 bg-red-700 transition" onClick={variant === Variant.LOGIN ? login : register}>
              {variant === Variant.LOGIN ? 'Login' : 'Subscribe'}
            </button>

            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <RoundedIcon Icon={FcGoogle} onClick={() => signIn('google', {callbackUrl: callbackUrl})}/>
              <RoundedIcon Icon={FaGithub}  onClick={() => signIn('github', {callbackUrl: callbackUrl})}/>
            </div>
            <p className="text-neutral-500 mt-10">
              {variant === Variant.LOGIN ? 'First time using Netflix?' : 'Already an account ?'}
              <span className="text-white font-semibold ml-2 hover:underline cursor-pointer" onClick={handleVariantChange}>
                {variant === Variant.LOGIN ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
