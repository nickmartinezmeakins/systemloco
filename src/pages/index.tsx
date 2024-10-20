import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../app/layout';
import { ApiResponse } from '@/types/deviceList';
import { useRouter } from 'next/router';

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.API_URL}/listDevices`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const apiResponse: ApiResponse = await res.json();

  if (!apiResponse || !Array.isArray(apiResponse.results)) {
    return { props: { apiResponse: { results: [] } } };
  }

  return { props: { apiResponse } };
}) satisfies GetServerSideProps<{ apiResponse: ApiResponse }>;

export default function Home({
  apiResponse,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push({
      pathname: '/device/[slug]',
      query: { slug: id },
    });
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`;
  };

  return (
    <Layout>
      {apiResponse.results.length > 0 ? (
        <table className="table-fixed w-full border-separate border-spacing-y-2">
          <thead className="sr-only md:not-sr-only text-left">
            <tr>
              <th className="px-4 py-3 bg-gray-200">Name</th>
              <th className="px-4 py-3 bg-gray-200">Model</th>
              <th className="px-4 py-3 bg-gray-200">Last Report Time</th>
              <th className="px-4 py-3 bg-gray-200">Next Report Time</th>
            </tr>
          </thead>
          <tbody>
            {apiResponse.results.map((data) => (
              <tr
                onClick={() => handleRowClick(data.id)}
                key={data.id}
                className="flex flex-col mb-4 sm:table-row w-full cursor-pointer text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-3 first:rounded-t-lg last:rounded-b-lg sm:first:rounded-t-none sm:last:rounded-b-none sm:first:rounded-tl-lg sm:first:rounded-bl-lg sm:last:rounded-tr-lg sm:last:rounded-br-lg"
              >
                <td className="px-4 py-3">{data.name || 'Not available'}</td>
                <td className="px-4 py-3">
                  <ul>
                    <li><strong>Name:</strong> {data.model.name || 'Not available'}</li>
                    <li><strong>Family:</strong> {data.model.family || 'Not available'}</li>
                    <li><strong>Product:</strong> {data.model.product || 'Not available'}</li>
                  </ul>
                </td>
                <td className="px-4 py-3">
                  {formatDateTime(data.lastReportTime) || 'Not available'}
                </td>
                <td className="px-4 py-3">
                  {formatDateTime(data.nextReportTime) || 'Not available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </Layout>
  );
}