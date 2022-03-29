export interface IMessage {
  id: string;
  homeId: string;
  senderId: string;
  receiverId?: string;
  content: string;
  sentAt: Date;
  repliedToId?: string;
}
