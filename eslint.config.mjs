import unjs from "eslint-config-unjs";

// https://github.com/unjs/eslint-config
export default unjs({
  ignores: [],
  rules: {
  "unicorn/prevent-abbreviations": 0,
  "unicorn/no-abusive-eslint-disable": 0
},
});