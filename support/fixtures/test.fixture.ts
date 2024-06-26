import { test as base } from "@playwright/test";
import api from "../utils/request.util";

type testFixtures = {
  API: api;
}

export const test = base.extend<testFixtures>({

  API: async ({ request }, use) => {
    const API = new api(request);
    await use(API);
  }
});
export { expect } from '@playwright/test';