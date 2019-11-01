declare module "rand-token" {
  type CharPack = "default" | "a-z" | "A-Z" | "0-9" | "base32";
  type RandomSource = "default" | "crypto" | "math";

  interface GeneratorOptions {
    chars: CharPack;
    source: RandomSource;
  }

  interface RandToken {
    generator(options: GeneratorOptions): string;
    generate(length: number, chars: string);
    uid(length?: number): string;

    suid(length?: number, epoch?: number, prefixLength?: number);
  }
  var randToken: RandToken;
  export = randToken;
}
