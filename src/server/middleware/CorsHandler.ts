import cors from 'cors';
import type { CorsOptions } from 'cors';
import type { RequestHandler } from 'express';
import { HttpHandler } from '../HttpHandler';
import type { HttpRequest } from '../HttpRequest';
import type { HttpResponse } from '../HttpResponse';

const defaultOptions: CorsOptions = {
  origin: (origin: any, callback: any): void => callback(null, origin ?? '*'),
};

// Components.js does not support the full CorsOptions yet
interface SimpleCorsOptions {
  origin?: string;
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

/**
 * Handler that sets CORS options on the response.
 */
export class CorsHandler extends HttpHandler {
  private readonly corsHandler: RequestHandler;

  public constructor(options: SimpleCorsOptions = {}) {
    super();
    this.corsHandler = cors({ ...defaultOptions, ...options });
  }

  public async handle(input: { request: HttpRequest; response: HttpResponse }): Promise<void> {
    return new Promise((resolve): void => {
      this.corsHandler(input.request as any, input.response as any, (): void => resolve());
    });
  }
}
