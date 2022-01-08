declare module 'async-express-mw' {
  import { Request, Response, NextFunction } from 'express';

  function asyncMw(
    fn: (
      req: Partial<Request>,
      res: Partial<Response>,
      ...next: [NextFunction]
    ) => Promise<typeof fn>
  ): Promise<void>;

  export = asyncMw;
}
