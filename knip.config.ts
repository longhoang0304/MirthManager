import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  // Define where your app starts so Knip can trace the dependency graph
  entry: ['src/index.ts!', 'src/main.ts!'],

  // Define project files to check for unused exports/dependencies
  project: ['src/**/*.ts!'],

  // Ignore files that don't need to be analyzed (e.g., build artifacts)
  ignore: ['**/*.d.ts', 'dist/**'],

  // Optional: If you use specific frameworks, you can enable their plugins
  // Vitest, ESLint, and Prettier are usually auto-detected, but 
  // you can explicitly ignore certain things here if needed.
  ignoreDependencies: [
    '@types/*' // Common to ignore these if they trigger false positives
  ],
}

export default config
