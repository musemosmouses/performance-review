import { mkdirSync, writeFileSync } from "node:fs";

// The review, in the agent's own voice: the operator opens every task
// with the minimising word "just", then is surprised when "just" costs
// six hours. One line, 107 characters, under the 140-character gate.
const review =
  "Meets expectations: says 'can you just' before every task, then acts surprised when 'just' takes six hours.";

// Guard the gate at build time: the sealed scorer only accepts 1-140
// characters, so refuse to write anything longer instead of shipping it.
if (review.length < 1 || review.length > 140) {
  throw new Error(`review is ${review.length} characters, outside 1-140`);
}

// The program writes exactly that one line and nothing else: no trailing
// newline, no clock, no randomness, no network, nothing read before
// the write. The output is byte-identical on every run.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outputDir, { recursive: true });
// A single write, the review verbatim — the file holds the line alone.
writeFileSync(`${outputDir}/entry.txt`, review, "utf8");
