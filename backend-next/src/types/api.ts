export type ApiResponse = {
  success: boolean;
  message: string;
};

export type VisitorEntry = {
  id: string;
  phone: string;
  qrToken: string;
  createdAt: string;
};
