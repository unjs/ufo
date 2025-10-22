import { rm } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  hooks: {
    async "build:done"() {
      await rm("dist/index.d.ts");
    },
  },
});
