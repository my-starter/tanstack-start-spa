import { createFileRoute } from '@tanstack/react-router'
import { getAllData } from '~/server/functions';
export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    try {
      const data = await getAllData();
      return data;
    } catch (error) {
      console.error(error)
    }
  },
})

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
    </div>
  )
}
