/* eslint-disable @typescript-eslint/naming-convention */
// @ts-check

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  sonarjs.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-enum-initializers": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/no-magic-numbers": "error",
      "no-loop-func": "off",
      "@typescript-eslint/no-loop-func": "error",
      "@typescript-eslint/naming-convention": "error",
      "@typescript-eslint/method-signature-style": "error",
      "@typescript-eslint/member-ordering": "error",
      "max-params": "off",
      "@typescript-eslint/max-params": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "default-param-last": "off",
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "class-methods-use-this": "off",
      "@typescript-eslint/class-methods-use-this": "error",
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
