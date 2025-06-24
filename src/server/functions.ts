import { createServerFn } from '@tanstack/react-start';

const getFullData = async (): Promise<any> => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const json = await response.json();

  if (!json.conference) {
    throw new Error('Invalid conference data format');
  }

  return json;
};

export const getAllData = createServerFn({
  method: 'GET',
})
  .validator(() => {})
  .handler(async (ctx: any) => {
    const data = await getFullData();
    return data;
  });
