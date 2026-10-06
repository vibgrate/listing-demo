# listing-demo

Example repository for Vibgrate GitHub Marketplace App listing screenshots.

It contains a small Node/TypeScript sample API (`sample-web-app`) plus Vibgrate
project config used to produce real DriftScore, Review, and merge-check output
on a dependency-change pull request.

Optional: set `HOST` and `PORT` to change where the server listens (defaults: `0.0.0.0:3000`).

Both variables may be omitted; the sample falls back to those defaults when unset.
See `src/index.ts` for the listen call.
