CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);

CREATE TABLE wallets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  userId UUID REFERENCES users(id),
  balance DECIMAL(10,2)
);

CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  walletIdFrom UUID REFERENCES wallets(id),
  walletIdTo UUID REFERENCES wallets(id),
  amount DECIMAL(10,2),
  timestamp TIMESTAMP
);
