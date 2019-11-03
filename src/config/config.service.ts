import * as dotenv from "dotenv";
import * as Joi from "@hapi/joi";
import * as fs from "fs";

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));

    // Load environment variables
    for (const k in config) {
      if (process.env[k] !== undefined) {
        config[k] = process.env[k];
      }
    }

    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid("development", "production")
        .default("development"),
      PORT: Joi.number().default(3000),
      FILES_ROOT: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get filesRoot(): string {
    return this.envConfig.FILES_ROOT;
  }
}
