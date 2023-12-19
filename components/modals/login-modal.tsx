'use client'
import { useLoginModal } from '@/hooks/use-login-modal'
import { X } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'

const LoginModal = () => {
  const loginModal = useLoginModal()
  if (loginModal.isOpen)
    return (
      <div className='fixed flex items-center justify-center z-50 h-full w-full bg-zinc-100/90'>
        <div className='w-full md:w-1/2 2xl:w-1/3 bg-white rounded-md'>
          <div className='relative flex justify-center pt-2'>
            <label className='text-xl'>로그인</label>
            <X
              onClick={loginModal.onClose}
              role='button'
              className='absolute top-2 right-2 hover:opacity-60'
            />
          </div>
          <hr />
          <Button
            onClick={() => signIn('google')}
            className='w-full flex justify-center my-8'
          >
            <FcGoogle size={24} className='mr-4' />
            <span>google로 로그인</span>
          </Button>
        </div>
      </div>
    )
}

export default LoginModal
