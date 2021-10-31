import { renderHook } from '@testing-library/react-hooks';
import useAxios from '../hooks/useAxios';
describe('getColumnsApi', () => {
  it('when call API loading get true', () => {
    expect.assertions(1);
    const { result } = renderHook(() =>
      useAxios({
        method: 'get',
        url: '/columns',
      })
    );
    expect(result.current.loading).toBeTruthy();
  });
  test('when call API response is return', async () => {
    expect.assertions(3);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios({
        method: 'get',
        url: '/columns',
      })
    );

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.response).toEqual(expect.any(Array));
    expect(result.current.response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          function: 'dimension',
          name: 'Country',
        }),
      ])
    );
  });
  test('when call API wrong error return', async () => {
    expect.assertions(3);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAxios({
        method: 'get',
        url: '/olumns',
      })
    );

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.response).toEqual(null);
    expect(result.current.error).not.toBe('');
  });
});
