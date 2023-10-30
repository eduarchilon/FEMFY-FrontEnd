import { Component, ViewChild } from '@angular/core';
import { UserResponse } from 'src/app/models/user.model';
import { SubcriptionService } from 'src/app/services/subscription/subscription.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MercadoPagoComponent } from './mercado-pago/mercado-pago.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})

export class SubscriptionComponent {

  showMercadoPagoForm = false;
  showForm = false;
  userResponse!: UserResponse;
  subscriptionForm!: FormGroup;


  constructor(
    private subscriptionService: SubcriptionService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
) {
    this.subscriptionForm = this.formBuilder.group({
        title: ['Suscripción Premium'],
        unit_price: [2500, Validators.required],
        quantity: [1, Validators.required]
    });
}

    ngOnInit(): void {
    }


    openMercadoPagoDialog(): void {
      const dialogRef = this.dialog.open(MercadoPagoComponent, {
        width: '400px', // Ajusta el ancho según tus necesidades
        data: { /* Puedes pasar datos al formulario si es necesario */ }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Maneja el resultado del formulario si es necesario
        console.log('El formulario se cerró con el resultado:', result);
      });
    }

    plan: any = {
      reason: '',
      value: null,
      frequency: 1, // Mensual por defecto, puedes cambiarlo
      // Otros campos del plan
    };
    
    crearPlan() {
      // Llama al servicio para crear el plan de suscripción
      this.subscriptionService.createSubscription(this.plan)
        .subscribe(
          (response) => {
            // Manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario
            console.log('Plan creado exitosamente', response);
          },
          (error) => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
            console.error('Error al crear el plan', error);
          }
        );
    }


    getDefaultPlaceholder(): string {
      switch (this.subscriptionForm.get('quantity')?.value) {
        case "1":
          return '$2.500 (Mensual)';
        case "3":
          return '$6.000 ($2.000 Mensual)';
        case "6":
          return '$9.000 ($1.500 Mensual)';
        case "12":
          return '$15.000 ($1.250 Mensual)';
        default:
          return '$2.500 (Mensual)';
      }
    }
  
    updateDefaultValue() {

    }
  
    toggleForm() {
      this.showForm = !this.showForm;
    }

    togglePaymentForm() {
      this.showMercadoPagoForm = !this.showMercadoPagoForm;
    }

}
