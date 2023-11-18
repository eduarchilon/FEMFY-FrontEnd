import { Component, ViewChild } from '@angular/core';
import { UserResponse } from 'src/app/models/user.model';
import { SubcriptionService } from 'src/app/services/subscription/subscription.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MercadoPagoComponent } from './mercado-pago/mercado-pago.component';
declare var createPayment: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  showMercadoPagoForm = false;
  showForm = false;
  userResponse!: UserResponse;
  subscriptionForm: FormGroup = new FormGroup({
    title: new FormControl('Suscripción Premium'),
    unit_price: new FormControl(2500, Validators.required),
    quantity: new FormControl(1, Validators.required),
    idUser: new FormControl(this.localStorageService.getUserByLogin()?.idUser),
    isSuscriptor: new FormControl(false),
  });

  constructor(
    private subscriptionService: SubcriptionService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.subscriptionForm = this.formBuilder.group({
      title: ['Suscripción Premium'],
      unit_price: [2500, Validators.required],
      quantity: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptionForm = this.formBuilder.group({
      idUser: [this.localStorageService.getUserByLogin()?.idUser],
      isSuscriptor: false,
    });
  }

  apiUrl: string = 'https://femfy-api.up.railway.app/api/v1/user/updateUser';

  updateProfile(preapprovalId: string) {
    if (this.subscriptionForm.valid) {
      const updatedUserData = this.subscriptionForm.value;

      const userData = {
        isSuscriptor: true,
        preapprovalId: preapprovalId,
      };

      console.log(userData);

      // Utiliza una solicitud PUT para actualizar el perfil
      this.http.put(`${this.apiUrl}`, updatedUserData).subscribe({
        next: (data: any) => {
          this.snackBar.open('Datos actualizados con éxito.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          });
        },
        error: (error: any) => {
          this.snackBar.open('Error al actualizar los datos.', 'cerrar', {
            duration: 5000, // Duración en milisegundos
          });
        },
      });
    }
  }

  getDefaultPlaceholder(): string {
    switch (this.subscriptionForm.get('quantity')?.value) {
      case '1':
        return '$2.500 (Mensual)';
      case '3':
        return '$6.000 ($2.000 Mensual)';
      case '6':
        return '$9.000 ($1.500 Mensual)';
      case '12':
        return '$15.000 ($1.250 Mensual)';
      default:
        return '$2.500 (Mensual)';
    }
  }

  updateDefaultValue() {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  togglePaymentForm() {
    this.showMercadoPagoForm = !this.showMercadoPagoForm;
  }
}
