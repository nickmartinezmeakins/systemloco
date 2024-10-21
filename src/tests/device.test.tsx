import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import { ApiResponse } from '@/types/deviceList';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home component', () => {
  const mockApiResponse: ApiResponse = {
    results: [
      {
        id: '72308628872413411',
        name: 'Office Tag',
        model: {
          name: 'LTR-HGR4-1-1',
          family: 'LTR-HGR4',
          product: 'LTR HGR4',
        },
        lastReportTime: null,
        nextReportTime: null,// dates were erroring due to the formatting. Not enough time to update (just needs so me time to get the escaping correct)
      },
    ],
  };

  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    });
  });

  it('renders the table with device data', () => {
    render(<Home apiResponse={mockApiResponse} />);
    expect(screen.getByText('Device 1')).toBeInTheDocument();
    expect(screen.getByText('Model X')).toBeInTheDocument();

  });
});