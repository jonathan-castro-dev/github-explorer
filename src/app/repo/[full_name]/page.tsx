import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import logoImg from '../../../../public/logo.svg'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface RepositoryProps {
  params: {
    full_name: string;
  }
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
  forks: number;
  open_issues: number;
  watchers: number;
}

interface RepositoryForks {
  id: number;
  name: string;
  html_url: string;
  owner: {
    login: string;
  }
}

export default async function Repository({ params }: RepositoryProps) {
  const { data } = await api.get<Repository>(`/repos/${params.full_name
    .replace('-', '/')}`)
  const repository: Repository = data

  let repoForks: RepositoryForks[] = []

  if (repository.forks) {
    const { data } = await api.get(`/repos/${params.full_name
      .replace('-', '/')}/forks`)
    repoForks = data
  }

  return (
    <div className='min-h-screen py-8 sm:px-10 md:px-20 bg-gray-100'>
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between">
          <Image src={logoImg} alt='Logo Github Explorer' width={180} />

          <Link
            href={"/"}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <FiChevronLeft className="h-4 w-4" />
            <span className="">Voltar</span>
          </Link>
        </header>

        <div className="flex sm:flex-col sm:items-start md:flex-row md:items-center
        gap-4 mt-16 mb-4">
          <img
            src={repository.owner.avatar_url}
            alt="Foto do perfil do Github"
            className='w-20 rounded-full'
          />

          <div className="">
            <strong className="text-gray-800 text-xl">
              {repository.full_name}
            </strong>
            <span className="block text-gray-700 text-sm">
              {repository.description}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-12 mb-16">
          <div className="leading-tight">
            <strong className="text-gray-800 text-xl">
              {repository.watchers}
            </strong>
            <span className="block text-gray-700 text-sm">
              Stars
            </span>
          </div>

          <div className="leading-tight">
            <strong className="text-gray-800 text-xl">
              {repository.forks}
            </strong>
            <span className="block text-gray-700 text-sm">
              Forks
            </span>
          </div>

          <div className="leading-tight">
            <strong className="text-gray-800 text-xl">
              {repository.open_issues}
            </strong>
            <span className="block text-gray-700 text-sm">
              Issues abertas
            </span>
          </div>
        </div>

        <main className="max-w-3xl max-h-[752px] overflow-y-auto scrollbar-thin
        scrollbar-thumb-gray-700 scrollbar-thumb-rounded-md">
          {repoForks.map(fork => {
            return (
              <Link
                href={fork.html_url}
                target="_blank"
                key={fork.id}
                className='flex items-center justify-between bg-white p-4 mb-4
                rounded hover:brightness-90'
              >
                <div>
                  <strong className='text-gray-900'>
                    {fork.name}
                  </strong>
                  <span className='block text-gray-500'>
                    {fork.owner.login}
                  </span>
                </div>

                <FiChevronRight className='h-4 w-4 text-gray-500' />
              </Link>
            )
          })}
        </main>
      </div>
    </div>
  )
}