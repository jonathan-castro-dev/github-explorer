import Link from "next/link";
import { memo } from "react";
import { FiChevronRight } from "react-icons/fi";

interface RepositoriesListProps {
  repositories: Array<{
    id: number;
    full_name: string;
    description: string;
    owner: {
      avatar_url: string;
    };
  }>
}

export function RepositoriesListComponent({ repositories }: RepositoriesListProps) {
  return (
    <main
      className='max-h-[752px] overflow-y-auto scrollbar-thin
      scrollbar-thumb-gray-700 scrollbar-thumb-rounded-md'
    >
      {repositories.map(repository => (
        <Link
          href={`/repo/${repository.full_name.replace('/', '-')}`}
          key={repository.id}
          className='flex items-center justify-between bg-white p-4 mb-4
          rounded hover:brightness-90'
        >
          <div className='flex items-center gap-4'>
            <img
              src={repository.owner.avatar_url}
              alt="Foto de perfil do Github"
              className='w-20 rounded-full sm:hidden md:block'
            />

            <div>
              <strong className='text-gray-900'>
                {repository.full_name}
              </strong>
              <span className='block text-gray-500'>
                {repository.description}
              </span>
            </div>
          </div>

          <FiChevronRight className='h-4 w-4 text-gray-500' />
        </Link>
      ))}
    </main>
  )
}

export const RepositoriesList = memo(RepositoriesListComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.repositories, nextProps.repositories)
})