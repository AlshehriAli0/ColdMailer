export type Recipient = {
  id: number;
  email_address: string;
  name: string;
  status: "accepted" | "pending" | "rejected";
  user_id: string;
  sent_at: string;
  note: string;
};
