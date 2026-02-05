-- Backfill trade history from logs + Alpaca
-- Generated: 2026-02-05T15:12:12.503Z

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '87a2af5a892212a1acb987e2d334d838',
    NULL,
    'dfebe09b-5c4e-440d-9109-0cdc0c262321',
    'CIFR',
    'sell',
    357.397426733,
    'market',
    NULL,
    NULL,
    'filled',
    357.397426733,
    14.06,
    'Take profit at +4.7%',
    '2026-02-05T14:35:21.117866Z',
    '2026-02-05T15:12:12.500Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'e189d54a5876b09281c941cd0a762e46',
    NULL,
    '84fcc9a6-6705-4ff8-a8a9-625dc87c80d9',
    'DRTS',
    'buy',
    657.892105263,
    'market',
    NULL,
    NULL,
    'filled',
    657.892105263,
    7.6,
    'Backfilled from Alpaca',
    '2026-02-05T14:33:18.207494Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '1748b46dcbe44ddc7f5e7a1789331bc0',
    NULL,
    '5f01daf5-ac3a-4727-9335-c9fe2f78c76a',
    'SNAP',
    'sell',
    826.441322314,
    'market',
    NULL,
    NULL,
    'filled',
    826.441322314,
    5.66,
    'LLM recommendation: SNAP has been held for over 23 hours with a negative P&L of -4.9%. Sentiment is low at 22%, suggesting limited recovery potential in the short term.',
    '2026-02-05T14:33:18.110414Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '1c0a2aab0704ee359e617d0427110124',
    NULL,
    '76a8f953-5c24-415a-8cb1-689084d0c8b1',
    'ONDS',
    'sell',
    512.818461538,
    'market',
    NULL,
    NULL,
    'filled',
    512.818461538,
    9.05,
    'Stop loss at -6.1%',
    '2026-02-05T14:32:42.271646Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '7346cadf5882ae07e49e0027a2ab5663',
    NULL,
    '933e8bdd-d080-406a-a544-846392a9d727',
    'IREN',
    'sell',
    108.253194715,
    'market',
    NULL,
    NULL,
    'filled',
    108.253194715,
    42.677999,
    'LLM recommendation: IREN is showing a significant loss and has weak sentiment at 27%. The deteriorating sentiment and loss suggest it''s prudent to cut losses.',
    '2026-02-05T14:30:49.675369Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '1cef5d919ebf92d6ef77cc42ccac5b2f',
    NULL,
    '75c14fae-ea9b-4cbc-baa4-34cc4b1f2dd2',
    'DRTS',
    'buy',
    657.892105263,
    'market',
    NULL,
    NULL,
    'filled',
    657.892105263,
    7.6,
    'Backfilled from Alpaca',
    '2026-02-05T14:30:49.625415Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'c1b3109d4f5dc7c1f6e571c8a02fc0f9',
    NULL,
    '897b77fe-8031-4a3b-9710-52b74733233e',
    'DRTS',
    'buy',
    657.892105263,
    'market',
    NULL,
    NULL,
    'filled',
    657.892105263,
    7.6,
    'Backfilled from Alpaca',
    '2026-02-05T14:30:35.888484Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '6c5d30ffdbb5e177f955ff8f36deb98a',
    NULL,
    'afbcbae9-c361-4571-8415-03cfb418cb4c',
    'GOOG',
    'sell',
    14.9813927,
    'market',
    NULL,
    NULL,
    'filled',
    14.9813927,
    310.003446,
    'Pre-market plan: GOOG has been held for over 21 hours with a significant negative P&L of -6.0%. The position has deteriorated beyond the stop loss threshold, and there are no strong positive sentiment signals to justify holding further.',
    '2026-02-05T14:30:35.795266Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '3fae0d9f067f672fc80003356239eff3',
    NULL,
    'ea6f7b8c-f6d8-4cbe-b799-d86cf4ad7d43',
    'AMD',
    'sell',
    24.081250301,
    'market',
    NULL,
    NULL,
    'filled',
    24.081250301,
    202.92,
    'Backfilled from Alpaca',
    '2026-02-04T20:47:48.495986Z',
    '2026-02-05T15:12:12.501Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'd66ee0537245bb5418ab0fd1fba0e9da',
    NULL,
    'd1266b13-5a2c-4668-aac1-197a9c13c8f8',
    'ONDS',
    'buy',
    512.818461538,
    'market',
    NULL,
    NULL,
    'filled',
    512.818461538,
    9.75,
    'Backfilled from Alpaca',
    '2026-02-04T20:10:18.701342Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '4e91fc0e889cb81d788560979f1c33e0',
    NULL,
    'dba9406b-a12f-41d0-9978-8a73732893ea',
    'IREN',
    'buy',
    108.253194715,
    'market',
    NULL,
    NULL,
    'filled',
    108.253194715,
    46.187921,
    'Backfilled from Alpaca',
    '2026-02-04T20:06:14.267468Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'd10a627f7a14cb997cd6b2e442b1c4ca',
    NULL,
    '5119f6d7-d061-42a5-b262-31fdb1a4d860',
    'CIFR',
    'buy',
    357.397426733,
    'market',
    NULL,
    NULL,
    'filled',
    357.397426733,
    13.99,
    'Backfilled from Alpaca',
    '2026-02-04T20:06:14.163668Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '6348c9302daf5bf1290237d81559c2be',
    NULL,
    '3167406e-ff87-40de-baa4-7185b38402dc',
    'MU',
    'buy',
    13.087767976,
    'market',
    NULL,
    NULL,
    'filled',
    13.087767976,
    382.035349,
    'Backfilled from Alpaca',
    '2026-02-04T20:01:30.229135Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'e97439f9816b8b2ae316756311b5579f',
    NULL,
    'a7553598-7b85-4e1a-b45c-4dff473dc88b',
    'RKLB',
    'buy',
    68.243652743,
    'market',
    NULL,
    NULL,
    'filled',
    68.243652743,
    73.266741,
    'Backfilled from Alpaca',
    '2026-02-04T19:59:04.32121Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '80556053aa430a06a2102cf9702b651f',
    NULL,
    '79701d7f-e62e-486d-a09d-932e8e6f84cb',
    'IREN',
    'sell',
    110.815381205,
    'market',
    NULL,
    NULL,
    'filled',
    110.815381205,
    46.51,
    'Backfilled from Alpaca',
    '2026-02-04T19:58:52.226074Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '20109203dce7a2de41b9db9e27266c60',
    NULL,
    '13cfe591-ffb2-4b0e-9a04-13252937af2a',
    'CIFR',
    'sell',
    370.529629629,
    'market',
    NULL,
    NULL,
    'filled',
    370.529629629,
    13.92,
    'Backfilled from Alpaca',
    '2026-02-04T19:58:52.177837Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'd03d93e43287c27749eaf6638372cea3',
    NULL,
    '4f17ac0f-1565-488e-8434-dac73e85f76f',
    'RKLB',
    'sell',
    71.386327957,
    'market',
    NULL,
    NULL,
    'filled',
    71.386327957,
    72.38,
    'Backfilled from Alpaca',
    '2026-02-04T19:54:21.833664Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'aed18175301a06b456ec4c2e7f25b87a',
    NULL,
    '226316b5-17a9-47bb-bb1a-60d6a7319065',
    'WULF',
    'sell',
    386.995356037,
    'market',
    NULL,
    NULL,
    'filled',
    386.995356037,
    13.4,
    'Backfilled from Alpaca',
    '2026-02-04T19:47:32.23269Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'd979690f99044d34bdaf40a0acc4a646',
    NULL,
    'df77a243-a5fc-402d-a0c5-57ff9921d8f8',
    'UAMY',
    'sell',
    633.711026615,
    'market',
    NULL,
    NULL,
    'filled',
    633.711026615,
    8.15,
    'Backfilled from Alpaca',
    '2026-02-04T19:47:32.186681Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '302cf79370ba2ec3dc87e7417d8c6f38',
    NULL,
    'f8e4911e-e044-42f0-96b3-9046fa689aad',
    'CIFR',
    'buy',
    370.529629629,
    'market',
    NULL,
    NULL,
    'filled',
    370.529629629,
    13.49417,
    'Backfilled from Alpaca',
    '2026-02-04T19:45:22.873618Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '678e8315a94c5d1ce4665f79f3481aec',
    NULL,
    '807c35ad-03a0-4122-bd66-338696c9f12d',
    'CIFR',
    'sell',
    386.397217928,
    'market',
    NULL,
    NULL,
    'filled',
    386.397217928,
    13.38,
    'Backfilled from Alpaca',
    '2026-02-04T19:42:49.178941Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '85b809d4a113c0869206ede68440ee9e',
    NULL,
    '712b30ea-e320-4b75-b0c9-0782cf1a4d35',
    'UAMY',
    'buy',
    633.711026615,
    'market',
    NULL,
    NULL,
    'filled',
    633.711026615,
    7.89,
    'Backfilled from Alpaca',
    '2026-02-04T18:08:40.93334Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '38c5befdbff10efdb0be9525b5f850a5',
    NULL,
    'e03ceb3c-8c61-4c76-8004-68b7c25cc7d3',
    'RKLB',
    'buy',
    71.386327957,
    'market',
    NULL,
    NULL,
    'filled',
    71.386327957,
    70.041283,
    'Backfilled from Alpaca',
    '2026-02-04T18:08:40.829636Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '93b03b312adf5dc4a0dde5ba0b39237f',
    NULL,
    'ab5f485f-dec1-43cc-92ac-91285037b9c1',
    'HOOD',
    'sell',
    61.858822073,
    'market',
    NULL,
    NULL,
    'filled',
    61.858822073,
    78.13,
    'Backfilled from Alpaca',
    '2026-02-04T18:04:05.15153Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '5700301122b69cd39e54fbd75beb8aca',
    NULL,
    'e60b2a47-0c60-47ff-bde3-350a12d84932',
    'CIFR',
    'buy',
    386.397217928,
    'market',
    NULL,
    NULL,
    'filled',
    386.397217928,
    12.94,
    'Backfilled from Alpaca',
    '2026-02-04T17:57:57.983643Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '429138e00f9bdaaa2ae9c8d75b79124e',
    NULL,
    'bce1919d-3cf7-4d22-b327-b40c3031442f',
    'MSFT',
    'buy',
    12.070840674,
    'market',
    NULL,
    NULL,
    'filled',
    12.070840674,
    414.220528,
    'Backfilled from Alpaca',
    '2026-02-04T17:53:05.123063Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '4e92f59cd344a2a536ba713eac7fd177',
    NULL,
    'eecf5b9a-0db7-44e0-87ac-65295fa36582',
    'CIFR',
    'sell',
    371.470282317,
    'market',
    NULL,
    NULL,
    'filled',
    371.470282317,
    12.79,
    'Backfilled from Alpaca',
    '2026-02-04T17:50:27.145354Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '574507439dfd1bc179e1f457c6253765',
    NULL,
    '8522119f-d879-440e-a240-38bf2e8e3865',
    'IREN',
    'buy',
    110.815381205,
    'market',
    NULL,
    NULL,
    'filled',
    110.815381205,
    45.12,
    'Backfilled from Alpaca',
    '2026-02-04T17:33:16.286483Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '3bc12f94dea931729ca1b449a8571635',
    NULL,
    '7a42327c-3b47-4b3a-8fd0-749915498163',
    'SMCI',
    'sell',
    146.958859829,
    'market',
    NULL,
    NULL,
    'filled',
    146.958859829,
    32.23,
    'Backfilled from Alpaca',
    '2026-02-04T17:30:37.225614Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'c4a5c1d8bb59ff1799cfe180ff9a59aa',
    NULL,
    '8a29d347-e22c-4018-9ee9-0d711aeb4dc1',
    'GOOG',
    'buy',
    14.9813927,
    'market',
    NULL,
    NULL,
    'filled',
    14.9813927,
    333.746675,
    'Backfilled from Alpaca',
    '2026-02-04T17:07:42.264213Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '7eaca557c48671365feaa45a6a0452c5',
    NULL,
    '6bb2f633-cfb5-4d5d-9fcf-990091f06b91',
    'CIFR',
    'buy',
    371.470282317,
    'market',
    NULL,
    NULL,
    'filled',
    371.470282317,
    13.46,
    'Backfilled from Alpaca',
    '2026-02-04T16:58:33.517731Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '527aef8a7b0e9eec8dedec38b4f55774',
    NULL,
    'b8f60693-f24c-4986-ab07-fc5a2449e854',
    'WULF',
    'buy',
    386.995356037,
    'market',
    NULL,
    NULL,
    'filled',
    386.995356037,
    12.92,
    'Backfilled from Alpaca',
    '2026-02-04T15:43:07.233886Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '530cb5447f0031b5bb45791d172b8103',
    NULL,
    '2c21909d-b1b3-4dca-bd5d-a54a45f7d3d5',
    'SNAP',
    'buy',
    826.441322314,
    'market',
    NULL,
    NULL,
    'filled',
    826.441322314,
    6.05,
    'Backfilled from Alpaca',
    '2026-02-04T15:29:49.567021Z',
    '2026-02-05T15:12:12.502Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    'c5a404ad85a6a3883db0d83830064490',
    NULL,
    'c871211f-56b5-49d7-a9aa-a000f27816cf',
    'SMCI',
    'buy',
    146.958859829,
    'market',
    NULL,
    NULL,
    'filled',
    146.958859829,
    34.023059,
    'Backfilled from Alpaca',
    '2026-02-04T15:25:27.745097Z',
    '2026-02-05T15:12:12.503Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '677dc1549d7a0719dcdbcd4683b8cdc3',
    NULL,
    'f9377247-836c-4d49-baa0-ced3141c2867',
    'HOOD',
    'buy',
    61.858822073,
    'market',
    NULL,
    NULL,
    'filled',
    61.858822073,
    80.829053,
    'Backfilled from Alpaca',
    '2026-02-04T15:21:15.411045Z',
    '2026-02-05T15:12:12.503Z'
  );

INSERT INTO trades (id, approval_id, alpaca_order_id, symbol, side, qty, order_type, limit_price, stop_price, status, filled_qty, filled_avg_price, reason, created_at, updated_at)
  VALUES (
    '889c82d763b4a7768739ce2cf4ec9cc0',
    NULL,
    'ed858502-d117-40d1-bd5e-8ff60cc641e0',
    'AMD',
    'buy',
    24.081250301,
    'market',
    NULL,
    NULL,
    'filled',
    24.081250301,
    207.63,
    'Backfilled from Alpaca',
    '2026-02-04T15:21:15.30659Z',
    '2026-02-05T15:12:12.503Z'
  );