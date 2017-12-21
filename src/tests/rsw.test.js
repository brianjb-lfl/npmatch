'use strict';

// https://hackernoon.com/service-worker-testing-made-easy-9a2d8e9aa50

const makeServiceWorkerEnv = require('service-worker-mock');

const Response = () => ({ clone: jest.fn() });
const Request = () => ({ url: '/test' });

describe.skip('Service worker', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  it('should delete old caches on activate', async () => {
      require('../registerServiceWorker.js');

      // Create old cache
      await self.caches.open('OLD_CACHE');
      expect(self.snapshot().caches.OLD_CACHE).toBeDefined();

      // Activate and verify old cache is removed
      await self.trigger('activate');
      expect(self.snapshot().caches.OLD_CACHE).toEqual({});
  });

  it('should return a cached response', async () => {
    global.fetch = jest.fn(() => Response());
    require('../registerServiceWorker.js');

    // Cache a request
    const cachedResponse = Response();
    const cache = await self.caches.open('TEST');
    cache.put(Request(), cachedResponse);

    // Verify the response is the cachedResponse
    const response = await self.trigger('fetch', Request());
    expect(response).toBe(cachedResponse);
  });

});