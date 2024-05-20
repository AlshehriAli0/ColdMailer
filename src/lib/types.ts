export type Recipient = {
  id: number;
  emailAddress: string;
  name: string;
  status: "accepted" | "pending" | "rejected";
  sentAt: string | Date;
};

