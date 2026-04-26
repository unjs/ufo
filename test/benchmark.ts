#!/usr/bin/env node

import { performance } from "node:perf_hooks";
import { styleText } from "node:util";
import { parseQuery, type ParsedQuery } from "../src";

const BENCHMARK_TIME_MS = readPositiveInteger("BENCHMARK_TIME_MS", 500);
const WARMUP_TIME_MS = readPositiveInteger("BENCHMARK_WARMUP_MS", 100);
const SAMPLE_COUNT = readPositiveInteger("BENCHMARK_SAMPLES", 3);
const BATCH_SIZE = readPositiveInteger("BENCHMARK_BATCH_SIZE", 1000);

type BenchmarkCase<TInput> = {
  name: string;
  input: TInput;
};

type BenchmarkSuite<TInput, TResult> = {
  name: string;
  cases: Array<BenchmarkCase<TInput>>;
  run: (input: TInput) => TResult;
};

type BenchmarkResult = {
  samples: number[];
  ops: number;
};

/**
 * Reads a positive integer from the environment.
 */
function readPositiveInteger(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

const EMPTY_SINK = Symbol("empty-sink");
let sink: unknown = EMPTY_SINK;
let observedRuns = 0;

/**
 * Runs a task for the requested duration and returns ops/sec.
 */
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

/**
 * Returns the median sample value.
 */
function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

/**
 * Formats ops/sec for benchmark output.
 */
function formatOps(value: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

/**
 * Benchmarks one input case with warmup and repeated samples.
 */
function runCase<TInput, TResult>(
  suite: BenchmarkSuite<TInput, TResult>,
  testCase: BenchmarkCase<TInput>,
): BenchmarkResult {
  const result: BenchmarkResult = {
    samples: [],
    ops: 0,
  };

  for (let sampleIndex = 0; sampleIndex < SAMPLE_COUNT; sampleIndex++) {
    const task = () => suite.run(testCase.input);
    runFor(WARMUP_TIME_MS, task);
    result.samples.push(runFor(BENCHMARK_TIME_MS, task));
  }

  result.ops = median(result.samples);
  return result;
}

/**
 * Prints benchmark results for a utility suite.
 */
function runSuite<TInput, TResult>(
  suite: BenchmarkSuite<TInput, TResult>,
): void {
  process.stdout.write(`\n${styleText("bold", suite.name)}\n`);

  const longestCaseName = Math.max(
    ...suite.cases.map((testCase) => testCase.name.length),
  );

  for (const testCase of suite.cases) {
    const result = runCase(suite, testCase);
    process.stdout.write(
      `${testCase.name.padEnd(longestCaseName)}  ${styleText(
        "bold",
        formatOps(result.ops).padStart(14),
      )} ${styleText("dim", "ops/sec")}\n`,
    );
  }
}

const longQuery = Array.from(
  { length: 50 },
  (_, index) => `key${index}=value%20${index}`,
).join("&");

const parseQuerySuite: BenchmarkSuite<string, ParsedQuery> = {
  name: "parseQuery",
  run: parseQuery,
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

if (observedRuns === 0 || sink === EMPTY_SINK) {
  process.exitCode = 1;
}
