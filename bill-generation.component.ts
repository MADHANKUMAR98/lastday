import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bill-generation',
  standalone: true,
  templateUrl: './bill-generation.component.html',
  styleUrls: ['./bill-generation.component.css'],
})
export class BillGenerationComponent {
  billForm: FormGroup;
  bills: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.billForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.minLength(3)]],
      noOfUnits: ['', [Validators.required, Validators.min(1)]],
      billAmount: ['', [Validators.required, Validators.min(1)]],
    });

    this.loadBills();
  }

  // Submit bill generation
  generateBill() {
    if (this.billForm.invalid) {
      return;
    }

    const billData = this.billForm.value;
    this.http
      .post('http://localhost:8080/api/bills/generate', billData)
      .subscribe(
        (response: any) => {
          console.log('Bill generated:', response);
          this.loadBills();
        },
        (error) => {
          console.error('Error generating bill:', error);
        }
      );
  }

  // Load all the generated bills
  loadBills() {
    this.http
      .get('http://localhost:8080/api/bills/user/CUST123')  // Example customer ID
      .subscribe(
        (response: any) => {
          this.bills = response;
        },
        (error) => {
          console.error('Error loading bills:', error);
        }
      );
  }
}