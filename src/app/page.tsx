'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { api } from '@/services/api'
import logoImg from '../../public/logo.svg'
import { RepositoriesList } from '@/components/RepositoriesList'

interface RepositoriesProps {
  id: number
  full_name: string
  description: string
  homepage: string
  owner: {
    avatar_url: string
  }
}

export default function Home() {
  const [repositories, setRepositories] = useState<RepositoriesProps[]>([])
  const [errorMessageInput, setErrorMessageInput] = useState('')

  async function handleSearchRepositories(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget)
      const valueInput = formData.get('repository')
      setErrorMessageInput('')

      if(!String(valueInput).trim()) {
        setErrorMessageInput('Campo vazio!')

        return
      }

      const newRepos = await api.get(`/users/${valueInput}/repos`)
      setRepositories(newRepos.data)
    } catch {
      setErrorMessageInput('Usuário inexistente!')
    }
  }

  return (
    <div className='min-h-screen py-8 sm:px-10 md:px-20 bg-gray-100'>
      <header>
        <Image src={logoImg} alt='Logo Github Explorer' width={180} />
      </header>

      <div className='max-w-3xl'>
        <form className='mb-20' onSubmit={handleSearchRepositories}>
          <h1 className='text-3xl text-gray-900 font-bold mt-16 mb-6'>
            Explore repositórios <br /> no Github.
          </h1>

          <div className='flex sm:flex-col md:flex-row items-start'>
            <div className='w-full'>
              <input
                name='repository'
                className='w-full placeholder:text-gray-500 px-6 py-3 rounded-l
                outline-0'
                placeholder='Digite o nome do usuário'
                type="text"
              />

              {errorMessageInput && (
                <span className='text-red'>
                  {errorMessageInput}
                </span>
              )}
            </div>

            <button
              className='bg-green hover:brightness-90 text-white py-3 px-6
              rounded-r sm:w-full sm:mt-4 md:w-fit md:mt-0'
              type="submit"
            >
              Pesquisar
            </button>
          </div>
        </form>

        <RepositoriesList repositories={repositories} />
      </div>
    </div>
  )
}
