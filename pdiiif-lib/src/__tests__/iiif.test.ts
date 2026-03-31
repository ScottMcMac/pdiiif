import { fetchFullImageService } from '../iiif';
import fetchMock from 'jest-fetch-mock';

describe('fetchFullImageService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('uses service id directly when it already points to info.json', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 'https://example.org/image/info.json' }));

    await fetchFullImageService({
      id: 'https://example.org/image/info.json',
      type: 'ImageService3',
      profile: 'level2',
    });

    expect(fetchMock).toHaveBeenCalledWith('https://example.org/image/info.json');
  });

  it('appends info.json when service id points to service root', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 'https://example.org/image/info.json' }));

    await fetchFullImageService({
      id: 'https://example.org/image',
      type: 'ImageService3',
      profile: 'level2',
    });

    expect(fetchMock).toHaveBeenCalledWith('https://example.org/image/info.json');
  });
});
