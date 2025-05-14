import { Component, OnInit } from '@angular/core';
import { ShoppingService} from "../services/shopping.service";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

interface ShoppingItem {
  _id?: string;
  name: string;
  bought: boolean;
  store?: string;
  date?: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  standalone: true,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: ShoppingItem[] = [];
  newItemForm: FormGroup;

  constructor(
    private shoppingService: ShoppingService,
    private fb: FormBuilder
  ) {
    this.newItemForm = this.fb.group({
      name: [''],
      store: ['']
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.shoppingService.getItems().subscribe((data: any) => {
      this.items = data;
    });
  }

  addItem() {
    const item: ShoppingItem = {
      name: this.newItemForm.value.name,
      store: this.newItemForm.value.store,
      bought: false,
      date: new Date().toISOString()
    };
    this.shoppingService.addItem(item).subscribe(() => {
      this.newItemForm.reset();
      this.loadItems();
    });
  }

  updateItem(item: ShoppingItem) {
    if (!item._id) return;
    this.shoppingService.updateItem(item._id, item).subscribe(() => this.loadItems());
  }

  deleteItem(id: string) {
    this.shoppingService.deleteItem(id).subscribe(() => this.loadItems());
  }

  toggleBought(item: ShoppingItem) {
    item.bought = !item.bought;
    this.updateItem(item);
  }
}
