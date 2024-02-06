import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $components: "src/lib/components",
      "$components/*": "src/lib/components/*",
      $abi: "src/lib/abi",
      "$abi/*": "src/lib/abi/*",
      $stores: "src/lib/stores",
      "$store/*": "src/lib/stores/*",
      $assets: "src/lib/assets",
      "$assets/*": "src/lib/assets/*",
      $helpers: "src/lib/helpers",
      "$helpers/*": "src/lib/helpers/*",
      $contracts: "src/lib/contracts",
      "$contracts/*": "src/lib/contracts/*",
    },
  },

  preprocess: [vitePreprocess({})],
};

export default config;
