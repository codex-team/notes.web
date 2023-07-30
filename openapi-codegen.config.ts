import { defineConfig } from '@openapi-codegen/cli';
import {
  generateFetchers,
  generateSchemaTypes
} from '@openapi-codegen/typescript';

export default defineConfig({
  notex: {
    from: {
      url: 'http://localhost:1337/openapi/yaml',
      source: 'url',
      // url: 'http://api.notex.so/openapi/json',
      // relativePath: './yaml.yml',
    },
    outputDir: 'src/infrastructure/transport',
    to: async (context) => {
      const filenamePrefix = 'notex';

      const { schemasFiles } = await generateSchemaTypes(
        context,
        {
          filenamePrefix,
        }
      );

      await generateFetchers(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
