import { Injectable } from '@angular/core';
import { PurchaseItemCreateUpdateRequest } from '../../shared/models/purchase-create-update-request.models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() {}

  getCartItems(): PurchaseItemCreateUpdateRequest[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(item: PurchaseItemCreateUpdateRequest): void {
    const currentItems = this.getCartItems();
    const existingItemIndex = currentItems.findIndex(
      (i) => i.jobName === item.jobName
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
      currentItems[existingItemIndex].price = item.price;
    } else {
      currentItems.push(item);
    }

    this.saveCartItems(currentItems);
  }

  removeFromCart(jobName: string): void {
    const currentItems = this.getCartItems().filter(
      (item) => item.jobName !== jobName
    );
    this.saveCartItems(currentItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  private saveCartItems(items: PurchaseItemCreateUpdateRequest[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  getCartTotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}