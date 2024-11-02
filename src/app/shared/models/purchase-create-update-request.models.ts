export interface PurchaseCreateUpdateRequest {
    total: number;
    userId: number;
    items: PurchaseItemCreateUpdateRequest[];
}
  
export interface PurchaseItemCreateUpdateRequest {
    companyName: string;
    jobName: string;
    quantity: number;
    price: number;
}