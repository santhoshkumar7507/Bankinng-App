"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    const mockAccounts = [
      {
        id: "acct_1",
        availableBalance: 12500.50,
        currentBalance: 13000.00,
        institutionId: "inst_1",
        name: "Chase Sapphire Checking",
        officialName: "Chase Sapphire Checking Account",
        mask: "1234",
        type: "depository",
        subtype: "checking",
        appwriteItemId: "bank_1",
        shareableId: "share_1"
      },
      {
        id: "acct_2",
        availableBalance: 50000.00,
        currentBalance: 50000.00,
        institutionId: "inst_2",
        name: "Bank of America Savings",
        officialName: "BofA High Yield Savings",
        mask: "5678",
        type: "depository",
        subtype: "savings",
        appwriteItemId: "bank_2",
        shareableId: "share_2"
      }
    ];
    return parseStringify({ data: mockAccounts, totalBanks: 2, totalCurrentBalance: 63000.00 });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    const mockAccount = {
        id: "acct_1",
        availableBalance: 12500.50,
        currentBalance: 13000.00,
        institutionId: "inst_1",
        name: "Chase Sapphire Checking",
        officialName: "Chase Sapphire Checking Account",
        mask: "1234",
        type: "depository",
        subtype: "checking",
        appwriteItemId: "bank_1",
    };
    
    const mockTransactions = [
      {
        id: "tx_1",
        name: "Apple Store",
        amount: 199.99,
        date: new Date().toISOString(),
        paymentChannel: "in store",
        category: "Electronics",
        type: "debit"
      },
      {
        id: "tx_2",
        name: "Salary Deposit",
        amount: 4500.00,
        date: new Date(Date.now() - 86400000).toISOString(),
        paymentChannel: "online",
        category: "Income",
        type: "credit"
      },
      {
        id: "tx_3",
        name: "Uber Rides",
        amount: 24.50,
        date: new Date(Date.now() - 172800000).toISOString(),
        paymentChannel: "online",
        category: "Transportation",
        type: "debit"
      }
    ];

    return parseStringify({
      data: mockAccount,
      transactions: mockTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};