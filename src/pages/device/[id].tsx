import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Layout from '../../app/layout';
import { DeviceItem } from '@/types/device';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`${process.env.API_URL}/device/${id}`);

  if (!res.ok) {
    return {
      notFound: true, 
    };
  }

  const device: DeviceItem = await res.json();

  return {
    props: {
      device,
    },
  };
};

export default function DevicePage({
  device,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-GB', { hour12: false })}`;
  };

  return (
    <Layout>
      <section className="bg-gray-200 px-4 py-3 rounded-lg">
        <h1>Device Details</h1>
        <p><strong>ID:</strong> {device.id}</p>
        <p><strong>Name:</strong> {device.name || 'Not Available'}</p>
        <div>
           <p><strong>Model:</strong> </p>
          <ul className="pl-4 list-disc">
            <li><strong>Name:</strong> {device.model.name || 'Not Available'}</li>
            <li><strong>Family:</strong> {device.model.family || 'Not Available'}</li>
            <li><strong>Product:</strong> {device.model.produc || 'Not Available'}</li>
          </ul>
          </div>
        <p><strong>Labels:</strong> </p>
        <p><strong>Last Known Location:</strong> </p>
        <p><strong>Firmware:</strong> </p>
        <p><strong>Status Indicators:</strong> </p>
        <p><strong>Last Report Time:</strong>{formatDateTime(device.lastReportTime) || 'Not available'}</p>
        <p><strong>Next Report Time:</strong>{formatDateTime(device.nextReportTime) || 'Not available'}</p>
      </section>
    </Layout>
  );
}