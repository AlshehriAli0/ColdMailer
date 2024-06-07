export type Recipient = {
  id: number;
  email_address: string;
  name: string;
  status: "accepted" | "pending" | "rejected";
  user_id: string;
  sent_at: string;
  note: string;
};

export type Totals = {
  totalRecipients: number;
  acceptedCount: number;
  rejectedCount: number;
  acceptedPercentage: number;
  rejectedPercentage: number;
  monthlyEmails: Record<number, number>;
};
