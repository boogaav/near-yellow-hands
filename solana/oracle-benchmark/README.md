# Solana oracle feasibility probe — M0

2026-11-21. **Blocked on authenticated report access; not a completed oracle verification benchmark.** Isolated tooling, no exchange changes, no deployment, no funds. Node 22+.

## Actual evidence

- `evidence/acquisition.json`: discovery HTTP 200; both BTC/USD candidates have `isSubscribed:false`. Canonical V3 latest-report request returned **401**, zero reports. The 1240.804 ms rejected-request round trip is **not** successful feed latency. Stop on 401/403/429 rather than hammering the service. Discovery is public, so its success proves neither credential validity nor entitlement.
- `evidence/accounts.json`: finalized mainnet slot 471977064 and devnet slot 524567313. Official verifier executable and owned by upgradeable loader; verifier PDA owned by that program; documented access accounts present. Account presence is not verifier invocation, code equivalence, access authorization or security review. Hashes are account-data hashes, NOT deployed executable hashes.
- Five local tests pass: malformed/incorrect report fields, ABI bounds, exact integer decoding, HMAC path/time binding, and honest failure/percentile accounting. Fixture decoding is **not cryptographic verification**.
- Authentic application CPI: **not run**. Direct-verifier simulation: **not run** (no acquired report). Compute, transaction bytes, simulation and confirmed/finalized latency: **unmeasured**. No fabricated success percentiles.

## Run

```sh
cd solana/oracle-benchmark
npm ci
npm test
CHAINLINK_CREDENTIALS_FILE=/absolute/private/chainlink-credentials.json npm run benchmark
node inspect.mjs
```

Credentials JSON uses `key`, `secret`, `environment:"mainnet"`. File must be protected and outside this directory. Key means Data Streams username UUID, secret means HMAC secret. No credentials are copied, printed or committed. No endpoint can be overridden to receive these credentials. A maximum of 1000 samples is enforced; default 5 with 1 second spacing. Set `SAMPLES`, `EVIDENCE_FILE` as needed. For a longer run, deliberately approve the provider request quota first. REST samples do not measure WebSocket delivery cadence.

Optional `LOCAL_REPORT_FILE=/absolute/private/report.json` saves acquired report bytes with mode 0600. Do not publish raw provider reports without reviewing licensing. The current run obtained none.

Once report access works, this **read-only direct verifier simulation scaffold** can run:

```sh
LOCAL_REPORT_FILE=/absolute/private/report.json \
SIMULATION_PAYER_PUBLIC_KEY=<existing-public-Solana-account> node simulate.mjs
```

It uses `simulateTransaction`, `sigVerify:false`, and a public fee payer only. It never signs or broadcasts; cannot spend or change accounts. It derives report-config PDA from signed context, compresses via Snappy and uses the official SDK instruction discriminator/account ordering. Rejects transactions above 1232 bytes. Outputs compute units, return producer and RPC simulation duration when available. Simulation wall time includes network/runtime overhead and is not execution duration or confirmation. An existing payer account and verifier access/config may be needed even in simulation. No access checks are bypassed in the verifier. **This direct invocation does not test a consuming application's CPI or its return-data validation.** Source scaffolding is not live-validated yet.

## Precise dependencies to unblock M0

1. Working mainnet Data Streams username UUID/HMAC credentials, plus confirmed BTC/USD V3 report entitlement. Existing pair gets 401; that alone cannot distinguish revoked/wrong credentials, clock/auth issues, or entitlement. HMAC algorithm matches current official JavaScript docs. No subscription was purchased.
2. Successfully acquire fresh signed reports; confirm decimals and exact feed product semantics independently. `manifest.json` deliberately leaves decimals null. Feed discovery is not a production pin.
3. Inspect the report-specific config PDA and current access-controller policy; obtain appropriate access if required. Existing account presence does not prove our caller authorized.
4. Build/pin a non-custodial consuming program in a local harness/devnet, invoke the authentic verifier via CPI, validate return producer/feed/fields, reject tampered reports and wrong config. Do not replace unavailable DON signatures with mocks and call it authentic verification.
5. Only after separately authorized test deployment/budget: measure processed/confirmed/finalized transactions. No write or fee spending was authorized for this task. Measure atomic and post-request modes separately; sustained 1000x economic/selection review remains open.

## Provenance

Manifest addresses obtained from the official [supported networks page](https://docs.chain.link/data-streams/supported-networks) and its delivered table bundle `Tables.BOStPG_D.js` on 2026-11-21. Program is `Gt9S41PtjR58CbG9JhJ3J6vxesqrNAswbWYbLNTMZA3c` on both clusters; access controllers differ. SDK source inspected at [893d234](https://github.com/smartcontractkit/chainlink-data-streams-solana/tree/893d2340254935fb947c95b6aa8e9e245c65ddc4), `crates/chainlink-solana-data-streams/src/lib.rs`.

[Official CPI example](https://docs.chain.link/data-streams/tutorials/solana-onchain-report-verification) is a community example, not production approval. [Authentication reference](https://docs.chain.link/data-streams/reference/data-streams-api/authentication/javascript-examples). Decoder handles only the selected canonical V3 feed and does not conflate bid/ask spread with statistical confidence. Alternative 0x1003-prefixed feed is not silently substituted.

Dependency install reported three moderate transitive advisories; this pinned client package is a benchmark only, not a production SDK approval. No production dependency graph changed.
