export type Recipient = {
  id: number;
  email_address: string;
  name: string;
  status: "accepted" | "pending" | "rejected";
  sent_at: string | Date;
};
