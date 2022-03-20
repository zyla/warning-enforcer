export type Event =
  | { type: "compiling"; moduleName: string }
  | { type: "warning"; fileName: string };

export function parse(input: string): Event[] {
  return input
    .split("\n")
    .map((line) => {
      let match: string[] | null;
      if ((match = /\bCompiling ([a-zA-Z0-9_.]+)/.exec(line))) {
        return { type: "compiling" as const, moduleName: match[1] };
      }
      return null;
    })
    .filter(notNull);
}

function notNull<T>(x: T | null): x is T {
  return x !== null;
}
