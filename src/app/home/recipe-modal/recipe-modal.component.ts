import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent implements OnInit {
  //umesto prosledjivanja reference za formu
  // koristimo dekorator kome dajemo naziv reference
  @ViewChild('f', { static: true }) form: NgForm;
  //preko dekoratora mozemo da pristupimo poljima forme

  //prop hvatamo kroz input dekorator
  @Input() title: string; // componentProps sa parent komponente (recipes-list - title: 'Add recipe') hvatamo sa input dekoroatorom

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddRecipe() {
    if (!this.form.valid) {
      return;
    }

    //zelimo da odavde (sa modala) presledimo podatke na recipe-list gde smo i kreirali modal
    this.modalCtrl.dismiss(
      {
        recipeData: {
          recipeName: this.form.value.recipeName,
          numOfIngredients: this.form.value.numOfIngred,
          numOfServings: this.form.value.numOfServ,
          numOfCal: this.form.value.numOfCal,
          details: this.form.value.details,
          imageUrl: this.form.value.imageUrl,
        },
      },
      'newRecipe'
    );
  }
}
