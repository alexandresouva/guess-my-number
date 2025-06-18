import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { environment } from './src/environments/environment';
/* ---------------- OFFICIAL DOCS: ----------------
  https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/quick-start.md
*/
export default defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    baseUrl: environment.baseUrl,

    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
          sourcemap: 'inline'
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    }
  }
});
