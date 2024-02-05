import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
import { loadSchema } from "untyped/loader";

async function main() {
  const entryPath = fileURLToPath(new URL("../src/index.ts", import.meta.url));
  const schema = await loadSchema(entryPath);
  const md: string[] = [];
  for (const [name, meta] of Object.entries(schema.properties!)) {
    // Only functions
    if (meta.type !== "function") {
      continue;
    }

    // Parse tag annotations
    const tags = parseTags(meta.tags);
    if (tags.length > 0) {
      console.log(name, tags);
    }

    // Ignore deprecated functions
    if (tags.some((t) => t.tag === "@deprecated")) {
      continue;
    }

    const jsSig = `${name}(${(meta.args || []).map((arg) => arg.name).join(", ")})`;

    md.push(`## \`${jsSig}\``, "");

    if (meta.title) {
      md.push(meta.title);
    }
    if (meta.description) {
      md.push(meta.description);
    }

    for (const tag of tags) {
      if (tag.tag === "@example") {
        const codeBlock = tag.contents.startsWith("`")
          ? tag.contents
          : `\`\`\`ts\n${tag.contents}\n\`\`\``;
        md.push("", "**Example:**", "", codeBlock);
      }
    }

    md.push("");
  }
  await writeFile("docs.md", md.join("\n"));
  await writeFile("docs.json", JSON.stringify(schema, undefined, 2));
}

function parseTags(untypedTags: string[] = []) {
  const tagsLines = untypedTags.join("\n").split("\n");
  const parsedTags: { tag: string; contents: string }[] = [];
  let currentTag = "";
  let currentTagContent = "";
  for (const tagLine of tagsLines) {
    if (tagLine.startsWith("@")) {
      if (currentTag) {
        parsedTags.push({
          tag: currentTag,
          contents: currentTagContent.trim(),
        });
      }
      const [_tag, ...rest] = tagLine.split(" ");
      currentTag = _tag;
      currentTagContent = rest.join(" ");
    } else {
      currentTagContent += tagLine;
    }
  }
  if (currentTag) {
    parsedTags.push({ tag: currentTag, contents: currentTagContent.trim() });
  }
  return parsedTags;
}

main().catch(console.error);
