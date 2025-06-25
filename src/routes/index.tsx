import { Button } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { getAllData } from '@/server/functions';
import { docsDb } from '@/store';

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    try {
      const data = await getAllData();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
});

async function handleClick() {
  console.log('docsDb', docsDb);
  const all = await docsDb.heroes.find().exec();
  console.log(all); // 应该能查到刚插入的数据
  const doc = await docsDb.heroes.insert({
    firstName: 'John',
    lastName: 'Doe',
    passportId: '1234567890',
  });
  console.log(doc.toJSON());
}

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
