#!/usr/bin/env node

import { deepStrictEqual } from "node:assert";
import { performance } from "node:perf_hooks";
import { styleText } from "node:util";
import {
  decodeQueryKey,
  decodeQueryValue,
  parseQuery,
  type ParsedQuery,
} from "../src";

const BENCHMARK_TIME_MS = readPositiveInteger("BENCHMARK_TIME_MS", 500);
const WARMUP_TIME_MS = readPositiveInteger("BENCHMARK_WARMUP_MS", 100);
const SAMPLE_COUNT = readPositiveInteger("BENCHMARK_SAMPLES", 3);
const BATCH_SIZE = readPositiveInteger("BENCHMARK_BATCH_SIZE", 1000);

type BenchmarkTask<TInput, TResult> = {
  name: string;
  run: (input: TInput) => TResult;
};

type BenchmarkCase<TInput> = {
  name: string;
  input: TInput;
};

type BenchmarkSuite<TInput, TResult> = {
  name: string;
  cases: Array<BenchmarkCase<TInput>>;
  tasks: Array<BenchmarkTask<TInput, TResult>>;
};

type BenchmarkResult<TInput, TResult> = {
  task: BenchmarkTask<TInput, TResult>;
  samples: number[];
  ops: number;
};

function readPositiveInteger(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function parseQueryBefore(parametersString = ""): ParsedQuery {
  const object: ParsedQuery = Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }

    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = decodeQueryValue(s[2] || "");
    const currentValue = object[key];
    if (currentValue === undefined) {
      object[key] = value;
    } else if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else {
      object[key] = [currentValue, value];
    }
  }
  return object;
}

let sink: unknown;
let observedRuns = 0;

function runFor(milliseconds: number, task: () => unknown): number {
  const start = performance.now();
  let iterations = 0;
  let elapsed = 0;

  do {
    for (let index = 0; index < BATCH_SIZE; index++) {
      sink = task();
    }
    iterations += BATCH_SIZE;
    observedRuns += BATCH_SIZE;
    elapsed = performance.now() - start;
  } while (elapsed < milliseconds);

  return (iterations / elapsed) * 1000;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function formatOps(value: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

function assertSameResults<TInput, TResult>(
  suite: BenchmarkSuite<TInput, TResult>,
): void {
  const [baseline, ...candidates] = suite.tasks;
  if (!baseline) {
    throw new Error(`${suite.name} has no benchmark tasks`);
  }

  for (const testCase of suite.cases) {
    const expected = baseline.run(testCase.input);
    for (const candidate of candidates) {
      deepStrictEqual(
        candidate.run(testCase.input),
        expected,
        `${suite.name}/${testCase.name}/${candidate.name}`,
      );
    }
  }
}

function runCase<TInput, TResult>(
  suite: BenchmarkSuite<TInput, TResult>,
  testCase: BenchmarkCase<TInput>,
): Array<BenchmarkResult<TInput, TResult>> {
  const results = suite.tasks.map((task) => ({
    task,
    samples: [] as number[],
    ops: 0,
  }));

  // Alternate task order to reduce first-run and branch-predictor bias.
  for (let sampleIndex = 0; sampleIndex < SAMPLE_COUNT; sampleIndex++) {
    const orderedResults =
      sampleIndex % 2 === 0 ? results : [...results].reverse();

    for (const result of orderedResults) {
      const task = () => result.task.run(testCase.input);
      runFor(WARMUP_TIME_MS, task);
      result.samples.push(runFor(BENCHMARK_TIME_MS, task));
    }
  }

  for (const result of results) {
    result.ops = median(result.samples);
  }
  return results;
}

function runSuite<TInput, TResult>(
  suite: BenchmarkSuite<TInput, TResult>,
): void {
  assertSameResults(suite);
  process.stdout.write(`\n${styleText("bold", suite.name)}\n`);

  const longestTaskName = Math.max(
    ...suite.tasks.map((task) => task.name.length),
  );

  for (const testCase of suite.cases) {
    const results = runCase(suite, testCase);
    const baselineOps = results[0].ops;

    process.stdout.write(`\n  ${testCase.name}\n`);
    for (const result of results) {
      const ratio = result.ops / baselineOps;
      const ratioText =
        result === results[0] ? "baseline" : `${ratio.toFixed(2)}x`;

      process.stdout.write(
        `  ${result.task.name.padEnd(longestTaskName)}  ${styleText(
          "bold",
          formatOps(result.ops).padStart(14),
        )} ${styleText("dim", "ops/sec")}  ${ratioText}\n`,
      );
    }
  }
}

const longQuery = Array.from(
  { length: 50 },
  (_, index) => `key${index}=value%20${index}`,
).join("&");

const parseQuerySuite: BenchmarkSuite<string, ParsedQuery> = {
  name: "parseQuery",
  tasks: [
    {
      name: "before (split + regex)",
      run: parseQueryBefore,
    },
    {
      name: "after  (single pass)",
      run: parseQuery,
    },
  ],
  cases: [
    {
      name: "empty",
      input: "",
    },
    {
      name: "single pair",
      input: "a=1",
    },
    {
      name: "mixed pairs",
      input: "foo=bar&baz=qux&unicode=%E5%A5%BD",
    },
    {
      name: "repeated keys",
      input: "tag=a&tag=b&tag=c",
    },
    {
      name: "encoded value",
      input: "param=%7B%22a%22:%5B1,2,3%5D%7D&x=1",
    },
    {
      name: "leading equals",
      input: "=foo=bar&==baz=qux&===",
    },
    {
      name: "long",
      input: longQuery,
    },
  ],
};

runSuite(parseQuerySuite);

if (observedRuns === 0) {
  process.exitCode = 1;
}
void sink;
